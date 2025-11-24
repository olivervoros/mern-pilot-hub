import LogbookEntryForm from './LogbookEntryForm';
import { type LogbookEntry } from '../types/LogbookEntry';

interface LogbookProps {
  logbookEntries: LogbookEntry[];
  setLogbookEntries: React.Dispatch<React.SetStateAction<LogbookEntry[]>>;
}

export default function Logbook({
  logbookEntries,
  setLogbookEntries,
}: LogbookProps) {
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
