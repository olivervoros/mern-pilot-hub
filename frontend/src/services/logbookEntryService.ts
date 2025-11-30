import axios from 'axios';

interface Headers {
  'Content-Type'?: string;
  Authorization?: string;
  [key: string]: string | undefined;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

const getLogbookEntries = (headers: Headers) =>
  api.get('/logbook-entries', { headers });
const createLogbookEntry = (logbookEntry: string, headers: Headers) =>
  api.post('/logbook-entries', logbookEntry, { headers });
const updateLogbookEntry = (
  id: string,
  logbookEntry: string,
  headers: Headers
) => api.put(`/logbook-entries/${id}`, logbookEntry, { headers });
const deleteLogbookEntry = (id: string, headers: Headers) =>
  api.delete(`/logbook-entries/${id}`, { headers });

export {
  getLogbookEntries,
  createLogbookEntry,
  updateLogbookEntry,
  deleteLogbookEntry,
};
