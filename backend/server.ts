import express from 'express';
import logbookEntryRouter from './routes/LogbookEntry.js';
import userRouter from './routes/User.js';
import { connectDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup routes
app.use('/api/logbook-entries', logbookEntryRouter);
app.use('/api/users', userRouter);

// ------------------------------ End -------------------------------

// Connect to database and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
