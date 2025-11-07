import React, { useState } from 'react';
import LogbookEntryCard from './LogbookEntryCard';
import EditForm from './EditForm';
import AddForm from './AddForm';
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
  const [displayForm, setDisplayForm] = useState<boolean>(false);
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

  const handleAddFormSave = () => {
    setDisplayForm(false);
  };

  const toggleDisplayForm = () => {
    setDisplayForm((prevDisplayForm) => !prevDisplayForm);
  };

  return (
    <div className='container'>
      <button
        type='button'
        className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
        onClick={toggleDisplayForm}
      >
        {displayForm ? 'Hide' : 'Display'} Add Logbook Entry Form
      </button>

      {displayForm && (
        <AddForm
          logbookEntries={logbookEntries}
          setLogbookEntries={setLogbookEntries}
          onSave={handleAddFormSave}
        />
      )}

      {/* Show entries list when NOT in edit mode */}
      {!editMode &&
        logbookEntries.map((entry: LogbookEntry) => (
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
        ))}

      {/* Show edit form when in edit mode */}
      {editMode && editedEntryId !== null && (
        <EditForm
          editedEntryId={editedEntryId}
          logbookEntries={logbookEntries}
          setLogbookEntries={setLogbookEntries}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}
