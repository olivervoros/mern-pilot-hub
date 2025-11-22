//import dotenv from 'dotenv';
import 'dotenv/config'

import express, { type Express } from 'express';
import logbookEntryRouter from './routes/LogbookEntry.ts';
import userRouter from './routes/User.ts';
import { connectDB } from './db.js';

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use('/api/logbook-entries', logbookEntryRouter);
app.use('/api/users', userRouter);

// ------------------------------ End -------------------------------

// Connect to database and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((error: Error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
