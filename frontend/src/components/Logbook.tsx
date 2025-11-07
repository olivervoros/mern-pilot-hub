import LogbookEntryForm from './LogbookEntryForm';
import { useState, useEffect } from 'react';
import { dummyData } from '../data/entries';
import { type LogbookEntry } from '../types/LogbookEntry';

export default function Logbook() {
  const [logbookEntries, setLogbookEntries] = useState(() => {
    const savedLogbookEntries: LogbookEntry[] = JSON.parse(
      localStorage.getItem('logbookEntries') || '[]'
    );
    return savedLogbookEntries.length > 0 ? savedLogbookEntries : dummyData;
  });

  useEffect(() => {
    localStorage.setItem('logbookEntries', JSON.stringify(logbookEntries));
  }, [logbookEntries]);
  return (
    <div className='container'>
      <h1 className='font-bold mb-4 text-2xl'>Pilot Hub - Logbook</h1>
      <LogbookEntryForm
        logbookEntries={logbookEntries}
        setLogbookEntries={setLogbookEntries}
      />
    </div>
  );
}
