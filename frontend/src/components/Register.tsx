import {
  useState,
  useContext,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from 'react';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

type NewUser = {
  name: string;
  email: string;
  password: string;
};

type RegisterProps = {
  newUser: NewUser[];
  setNewUser: Dispatch<SetStateAction<NewUser[]>>;
};

export default function Register({ setNewUser }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newUser = JSON.stringify({
        name,
        email,
        password,
      });

      const response = await register(newUser, {
        'Content-Type': 'application/json',
      });

      // Add new entry to the logbook
      setNewUser((prevEntries) => [
        {
          name: name,
          email: email,
          password: password,
        },
        ...prevEntries,
      ]);

      const accessToken = response?.data?.accessToken;
      const userId = response?.data?.userId;

      console.log(userId, accessToken);
      setAuth({ userId, accessToken });

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');

      navigate('/logbook', { replace: true });

      // Update the logbook entry with the response from the API
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container'>
      <h1 className='font-bold mb-4 text-2xl'>Pilot Hub - Register</h1>
      <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            User's Full Name
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='text'
            id='title'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            User's Email Address
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='email'
            id='title'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            User's Password
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  );
}
