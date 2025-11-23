import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for LogbookEntry document
export interface ILogbookEntry extends Document {
  title: string;
  departureIcao: string;
  arrivalIcao: string;
  aircraftType: string;
  departureTime: String;
  arrivalTime: String;
  additionalInfo: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const logbookEntrySchema = new Schema<ILogbookEntry>(
  {
    title: {
      type: String,
      required: true,
    },
    departureIcao: {
      type: String,
      required: true,
      maxlength: 4,
    },
    arrivalIcao: {
      type: String,
      required: true,
      maxlength: 4,
    },
    aircraftType: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create and export the model
const LogbookEntry: Model<ILogbookEntry> = mongoose.model<ILogbookEntry>(
  'LogbookEntry',
  logbookEntrySchema
);

export default LogbookEntry;
