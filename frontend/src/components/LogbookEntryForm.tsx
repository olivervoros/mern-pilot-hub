import React, { useState, useContext } from 'react';
import LogbookEntryCard from './LogbookEntryCard';
import EditForm from './EditForm';
import { type LogbookEntry } from '../types/LogbookEntry';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

interface LogbookEntryFormProps {
  logbookEntries: LogbookEntry[];
  setLogbookEntries: React.Dispatch<React.SetStateAction<LogbookEntry[]>>;
}

export default function LogbookEntryForm({
  logbookEntries,
  setLogbookEntries,
}: LogbookEntryFormProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedEntryId, setEditedEntryId] = useState<string | null>(null);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/logbook-entries/${_id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      // Update state after successful deletion
      const newEntries = logbookEntries.filter(
        (prevEntries: LogbookEntry) => prevEntries._id !== _id
      );
      setLogbookEntries(newEntries);

      navigate('/logbook', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (_id: string) => {
    setEditedEntryId(_id);
    setEditMode(true);
  };

  const handleEditSave = () => {
    // Reset edit mode and edited entry ID
    setEditMode(false);
    setEditedEntryId(null);
  };

  const entriesWithIds = logbookEntries.filter(
    (entry): entry is LogbookEntry & { _id: string } =>
      typeof entry._id === 'string'
  );

  return (
    <div className='container'>
      {/* Show entries list when NOT in edit mode */}
      {!editMode &&
        Array.isArray(entriesWithIds) &&
        entriesWithIds.length > 0 &&
        entriesWithIds.map((entry) => (
          <LogbookEntryCard
            key={entry._id}
            _id={entry._id}
            title={entry.title}
            departureIcao={entry.departureIcao}
            arrivalIcao={entry.arrivalIcao}
            aircraftType={entry.aircraftType}
            departureTime={entry.departureTime}
            arrivalTime={entry.arrivalTime}
            additionalInfo={entry.additionalInfo}
            handleEdit={() => handleEdit(entry._id)}
            handleDelete={() => handleDelete(entry._id)}
          />
        ))}

      {/* Show edit form when in edit mode */}
      {editMode && editedEntryId !== null && (
        <EditForm
          key={`edit-${editedEntryId}`}
          editedEntryId={editedEntryId}
          logbookEntries={logbookEntries}
          setLogbookEntries={setLogbookEntries}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}
