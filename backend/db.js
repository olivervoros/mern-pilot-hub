import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL environment variable is not defined. Please set it in your .env file.');
}

// Connect to MongoDB using Mongoose
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: 'pilot-hub', // Specify your database name here
    });
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};
