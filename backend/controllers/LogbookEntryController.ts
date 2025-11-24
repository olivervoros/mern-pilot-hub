import type { Request, Response } from 'express';
import LogbookEntry from '../models/LogbookEntry.ts';

// Controller function to create a new logbook entry
export const createNewLogbookEntry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      userId,
      departureIcao,
      arrivalIcao,
      aircraftType,
      departureTime,
      arrivalTime,
      additionalInfo,
    } = req.body;

    // Create a new LogbookEntry instance
    const newLogbookEntry = new LogbookEntry({
      title,
      userId,
      departureIcao,
      arrivalIcao,
      aircraftType,
      departureTime,
      arrivalTime,
      additionalInfo,
    });

    // Save the new entry to the database
    await newLogbookEntry.save();

    res.status(201).json({
      message: 'LogbookEntry registered successfully.',
      LogbookEntry: newLogbookEntry,
    });
  } catch (error) {
    console.error('Error creating a new LogbookEntry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get all logbook entries
export const getAllLogbookEntries = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const logbookEntries = await LogbookEntry.find();

    res.status(200).json({ LogbookEntries: logbookEntries });
  } catch (error) {
    console.error('Error fetching all LogbookEntries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update an existing logbook entry
export const updateLogbookEntry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      userId,
      departureIcao,
      arrivalIcao,
      aircraftType,
      departureTime,
      arrivalTime,
      additionalInfo,
    } = req.body;

    const updatedLogbookEntry = await LogbookEntry.findByIdAndUpdate(
      id,
      {
        title,
        userId,
        departureIcao,
        arrivalIcao,
        aircraftType,
        departureTime,
        arrivalTime,
        additionalInfo,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLogbookEntry) {
      res.status(404).json({ message: 'LogbookEntry not found.' });
      return;
    }

    res.status(200).json({
      message: 'LogbookEntry updated successfully.',
      LogbookEntry: updatedLogbookEntry,
    });
  } catch (error) {
    console.error('Error updating LogbookEntry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a logbook entry by ID
export const getLogbookEntryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const logbookEntry = await LogbookEntry.findById(id);

    if (!logbookEntry) {
      res.status(404).json({ message: 'LogbookEntry not found.' });
      return;
    }

    res.status(200).json({ LogbookEntry: logbookEntry });
  } catch (error) {
    console.error('Error fetching LogbookEntry by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a logbook entry by ID
export const deleteLogbookEntryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedLogbookEntry = await LogbookEntry.findByIdAndDelete(id);

    if (!deletedLogbookEntry) {
      res.status(404).json({ message: 'LogbookEntry not found.' });
      return;
    }

    res.status(200).json({
      message: 'LogbookEntry deleted successfully.',
      LogbookEntry: deletedLogbookEntry,
    });
  } catch (error) {
    console.error('Error deleting LogbookEntry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
