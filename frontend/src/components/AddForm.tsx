import { useState, useContext } from 'react';
import { type LogbookEntry } from '../types/LogbookEntry';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface AddFormProps {
  setLogbookEntries: React.Dispatch<React.SetStateAction<LogbookEntry[]>>;
}

export default function AddForm({ setLogbookEntries }: AddFormProps) {
  const [title, setTitle] = useState('');
  const [departureIcao, setDepartureIcao] = useState('');
  const [arrivalIcao, setArrivalIcao] = useState('');
  const [aircraftType, setAircraftType] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const addNewLogookEntry = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/logbook-entries',
        JSON.stringify({
          title: title,
          userId: auth.userId,
          departureIcao: departureIcao,
          arrivalIcao: arrivalIcao,
          aircraftType: aircraftType,
          departureTime: departureTime,
          arrivalTime: arrivalTime,
          additionalInfo: additionalInfo,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.accessToken}`,
          },
          //withCredentials: true,
        }
      );
      console.log(response?.data);

      // Update state with the new entry from the API response (includes _id)
      const newEntry = response?.data?.LogbookEntry || response?.data;
      if (newEntry) {
        setLogbookEntries((prevEntries) => [newEntry, ...prevEntries]);
      }

      // Reset form fields
      setTitle('');
      setDepartureIcao('');
      setArrivalIcao('');
      setAircraftType('');
      setDepartureTime('');
      setArrivalTime('');
      setAdditionalInfo('');

      navigate('/logbook', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className='max-w-sm mx-auto' onSubmit={addNewLogookEntry}>
        <div className='mb-5'>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Title
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='text'
            id='title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='departureIcao'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Departure Airport (ICAO)
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='text'
            id='departureIcao'
            onChange={(e) => setDepartureIcao(e.target.value)}
            value={departureIcao}
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='arrivalIcao'
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            Arrival Airport (ICAO)
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='text'
            id='arrivalIcao'
            onChange={(e) => setArrivalIcao(e.target.value)}
            value={arrivalIcao}
            required
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='aircraftType'
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            Select the aircraft type
          </label>
          <select
            id='aircraftType'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            onChange={(e) => setAircraftType(e.target.value)}
            value={aircraftType}
            required
          >
            <option value=''>Choose an aircraft</option>
            <option value='736'>736</option>
            <option value='777'>777</option>
            <option value='C208'>C208</option>
          </select>
        </div>

        <div className='mb-5'>
          <label
            htmlFor='departureTime'
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            Departure (HH:MM)
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='text'
            id='departureTime'
            onChange={(e) => setDepartureTime(e.target.value)}
            value={departureTime}
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='arrivalTime'
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            Arrival (HH:MM)
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='text'
            id='arrivalTime'
            onChange={(e) => setArrivalTime(e.target.value)}
            value={arrivalTime}
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='additionalInfo'
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            Additional Information
          </label>
          <textarea
            id='additionalInfo'
            rows={4}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Write your thoughts here...'
            onChange={(e) => setAdditionalInfo(e.target.value)}
            value={additionalInfo}
          ></textarea>
        </div>
        <button
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          type='submit'
        >
          Save Logbook Entry
        </button>
      </form>
    </div>
  );
}
