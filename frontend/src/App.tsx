import './App.css';
import Logbook from './components/Logbook';
import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './components/Register';
import Login from './components/Login';
import { useState } from 'react';

type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

type LoginUser = {
  email: string;
  password: string;
};

function App() {
  const [newUser, setNewUser] = useState<RegisterUser[]>([]);
  const [loginUser, setLoginUser] = useState<LoginUser[]>([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='login'
            element={
              <Login loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          />
          <Route
            path='register'
            element={<Register newUser={newUser} setNewUser={setNewUser} />}
          />
          <Route path='logbook' element={<Logbook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
