import {
  useState,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from 'react';

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add new entry to the logbook
    setLoginUser((prevEntries) => [
      {
        name: name,
        email: email,
        password: password,
      },
      ...prevEntries,
    ]);

    // Reset form fields
    setEmail('');
    setPassword('');
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
