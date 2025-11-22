import mongoose from 'mongoose';

const uri =
  'mongodb+srv://olivervoros_db_user:rPxZTMgAgr8XD9SYYqfbkETx9Mn7Wx@cluster0.eiuwxor.mongodb.net/?appName=Cluster0';

// Connect to MongoDB using Mongoose
export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: 'pilot-hub', // Specify your database name here
    });
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};
