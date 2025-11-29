import { Link } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

export default function Nav() {
  const { auth } = useContext(AuthContext);
  const isLoggedIn = !!auth.accessToken;

  return (
    <nav>
      <div>
        <ul className='flex justify-center space-x-2 my-5 text-blue-600 underline'>
          {!isLoggedIn && (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to='/logout'>Logout</Link>
              </li>
              <li>
                <Link to='/logbook'>Logbooks</Link>
              </li>
              <li>
                <Link to='/add-logbook'>Add New Logbook Entry</Link>
              </li>
              <li>
                <Link to='/weather-forecast'>Weather Forecast</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
