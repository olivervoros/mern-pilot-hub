import { useState, useEffect, useContext } from 'react';
import { type LogbookEntry } from '../types/LogbookEntry';
import AuthContext from '../context/AuthProvider';
import { updateLogbookEntry } from '../services/logbookEntryService';

interface EditFormProps {
  editedEntryId: string;
  logbookEntries: LogbookEntry[];
  setLogbookEntries: React.Dispatch<React.SetStateAction<LogbookEntry[]>>;
  onSave: () => void;
}

export default function EditForm({
  editedEntryId,
  logbookEntries,
  setLogbookEntries,
  onSave,
}: EditFormProps) {
  const [title, setTitle] = useState('');
  const [departureIcao, setDepartureIcao] = useState('');
  const [arrivalIcao, setArrivalIcao] = useState('');
  const [aircraftType, setAircraftType] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const { auth } = useContext(AuthContext);

  // Find the entry being edited
  const editedFormEntry = logbookEntries.find(
    (item: LogbookEntry) => item._id === editedEntryId
  );

  // Initialize form fields when the entry is found
  useEffect(() => {
    if (editedFormEntry) {
      setTitle(editedFormEntry.title || '');
      setDepartureIcao(editedFormEntry.departureIcao || '');
      setArrivalIcao(editedFormEntry.arrivalIcao || '');
      setAircraftType(editedFormEntry.aircraftType || '');
      setDepartureTime(editedFormEntry.departureTime || '');
      setArrivalTime(editedFormEntry.arrivalTime || '');
      setAdditionalInfo(editedFormEntry.additionalInfo || '');
    }
  }, [editedFormEntry]);

  const handleEditForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editLogbookEntry = JSON.stringify({
      title,
      userId: auth.userId,
      departureIcao,
      arrivalIcao,
      aircraftType,
      departureTime,
      arrivalTime,
      additionalInfo,
    });

    try {
      const response = await updateLogbookEntry(
        editedEntryId,
        editLogbookEntry,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`,
        }
      );

      // Update the logbook entry with the response from the API
      const updatedEntry = response?.data?.LogbookEntry || response?.data;
      if (updatedEntry) {
        setLogbookEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === editedEntryId ? updatedEntry : entry
          )
        );
      }
    } catch (err) {
      console.log(err);
    }

    // Call the onSave callback to close the form
    onSave();
  };

  const handleCancel = () => {
    onSave();
  };

  // Show loading state if entry not found
  if (!editedFormEntry) {
    return <div>Entry not found</div>;
  }

  return (
    <form className='max-w-sm mx-auto' onSubmit={handleEditForm}>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={departureIcao}
          onChange={(e) => setDepartureIcao(e.target.value)}
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
          value={arrivalIcao}
          onChange={(e) => setArrivalIcao(e.target.value)}
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
          value={aircraftType}
          onChange={(e) => setAircraftType(e.target.value)}
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
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
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
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
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
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        ></textarea>
      </div>
      <div className='flex gap-2'>
        <button
          className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          type='button'
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className='text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          type='submit'
        >
          Save Edited Logbook Entry
        </button>
      </div>
    </form>
  );
}
