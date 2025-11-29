import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

export default function Logout() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication state
    setAuth({});
    // Redirect to login page
    navigate('/login', { replace: true });
  }, [setAuth, navigate]);

  return (
    <div className='container'>
      <h1 className='font-bold mb-4 text-2xl'>Logging out...</h1>
      <p>You are being logged out and redirected to the login page.</p>
    </div>
  );
}
