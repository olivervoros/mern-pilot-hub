import express from 'express';
import {
  createNewLogbookEntry,
  getAllLogbookEntries,
  updateLogbookEntry,
  getLogbookEntryById,
  deleteLogbookEntryById,
} from '../controllers/LogbookEntryController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example: Apply authentication middleware to all routes
// Uncomment the line below to protect all routes in this file
// router.use(authenticateToken);

// Define route for creating a new logbook entry
// Example: Apply middleware to specific routes
// router.post('/add', authenticateToken, createNewLogbookEntry);
router.post('/add', createNewLogbookEntry);

// Example: Protect multiple routes
// router.get('/', authenticateToken, getAllLogbookEntries);
router.get('/', getAllLogbookEntries);

// Example: Protect update route
// router.put('/:id', authenticateToken, updateLogbookEntry);
router.put('/:id', updateLogbookEntry);

// Example: Protect get by ID route
// router.get('/:id', authenticateToken, getLogbookEntryById);
router.get('/:id', getLogbookEntryById);

// Example: Protect delete route
// router.delete('/:id', authenticateToken, deleteLogbookEntryById);
router.delete('/:id', deleteLogbookEntryById);

export default router;
