import React, { useState } from 'react';
import LogbookEntryCard from './LogbookEntryCard';
import EditForm from './EditForm';
import { type LogbookEntry } from '../types/LogbookEntry';

interface LogbookEntryFormProps {
  logbookEntries: LogbookEntry[];
  setLogbookEntries: React.Dispatch<React.SetStateAction<LogbookEntry[]>>;
}

export default function LogbookEntryForm({
  logbookEntries,
  setLogbookEntries,
}: LogbookEntryFormProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedEntryId, setEditedEntryId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    const newEntries = logbookEntries.filter(
      (prevEntries: LogbookEntry) => prevEntries.id !== id
    );
    setLogbookEntries(newEntries);
  };

  const handleEdit = (id: number) => {
    setEditedEntryId(id);
    setEditMode(true);
  };

  const handleEditSave = () => {
    // Reset edit mode and edited entry ID
    setEditMode(false);
    setEditedEntryId(null);
  };

  return (
    <div className='container'>
      {/* Show entries list when NOT in edit mode */}
      {!editMode && Array.isArray(logbookEntries) && logbookEntries.length > 0
        ? logbookEntries.map((entry: LogbookEntry) => (
            <LogbookEntryCard
              key={entry.id}
              id={entry.id}
              title={entry.title}
              departureIcao={entry.departureIcao}
              arrivalIcao={entry.arrivalIcao}
              aircraftType={entry.aircraftType}
              departureTime={entry.departureTime}
              arrivalTime={entry.arrivalTime}
              additionalInfo={entry.additionalInfo}
              handleEdit={() => handleEdit(entry.id)}
              handleDelete={() => handleDelete(entry.id)}
            />
          ))
        : null}

      {/* Show edit form when in edit mode */}
      {editMode && editedEntryId !== null ? (
        <EditForm
          key={`edit-${editedEntryId}`}
          editedEntryId={editedEntryId}
          logbookEntries={logbookEntries}
          setLogbookEntries={setLogbookEntries}
          onSave={handleEditSave}
        />
      ) : null}
    </div>
  );
}
