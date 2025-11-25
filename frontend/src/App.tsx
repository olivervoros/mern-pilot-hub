import './App.css';
import Logbook from './components/Logbook';
import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './components/Register';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import AddForm from './components/AddForm';
import WeatherForecast from './components/WeatherForecast';
import { type LogbookEntry } from './types/LogbookEntry';
import axios from 'axios';

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
  const [logbookEntries, setLogbookEntries] = useState<LogbookEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          'http://localhost:3000/api/logbook-entries'
        );
        console.log(response);
        // The API returns { LogbookEntries: [...] }, so extract the array
        setLogbookEntries(response.LogbookEntries || []);
      } catch (error) {
        console.error((error as Error).message);
        // Ensure logbookEntries is always an array even on error
        setLogbookEntries([]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav />
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
          <Route
            path='logbook'
            element={
              <Logbook
                logbookEntries={logbookEntries}
                setLogbookEntries={setLogbookEntries}
              />
            }
          />
          <Route path='weather-forecast' element={<WeatherForecast />} />
          <Route
            path='add-logbook'
            element={<AddForm setLogbookEntries={setLogbookEntries} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
