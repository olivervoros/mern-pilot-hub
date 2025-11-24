import { Link } from 'react-router';
export default function Nav() {
  return (
    <nav>
      <div>
        <ul className='flex justify-center space-x-2 my-5 text-blue-600 underline'>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/logbook'>Logbook</Link>
          </li>
          <li>
            <Link to='/add-logbook'>Add New Logbook Entry</Link>
          </li>
          <li>
            <Link to='/weather-forecast'>Weather Forecast</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
