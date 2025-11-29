import {
  useState,
  useContext,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

type NewUser = {
  email: string;
  password: string;
};

type LoginProps = {
  loginUser: NewUser[];
  setLoginUser: Dispatch<SetStateAction<NewUser[]>>;
};

export default function Login({ setLoginUser }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log in a user
    setLoginUser((prevEntries) => [
      {
        email: email,
        password: password,
      },
      ...prevEntries,
    ]);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/login`,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          //withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const userId = response?.data?.userId;

      console.log(userId, accessToken);
      setAuth({ userId, accessToken });
      setEmail('');
      setPassword('');
      navigate('/logbook', { replace: true });
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='container'>
      <h1 className='font-bold mb-4 text-2xl'>Pilot Hub - Login</h1>
      <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
}
