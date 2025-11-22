import mongoose from 'mongoose';

const logbookEntrySchema = new mongoose.Schema(
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
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
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
export default mongoose.model('LogbookEntry', logbookEntrySchema);
