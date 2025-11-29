import express, { Router } from 'express';
import {
  createNewLogbookEntry,
  getAllLogbookEntries,
  updateLogbookEntry,
  getLogbookEntryById,
  deleteLogbookEntryById,
} from '../controllers/LogbookEntryController.ts';
import { authenticateToken } from '../middleware/authMiddleware.ts';

const router: Router = express.Router();

// Example: Apply authentication middleware to all routes
// Uncomment the line below to protect all routes in this file
// router.use(authenticateToken);

// Define route for creating a new logbook entry
// Example: Apply middleware to specific routes
// router.post('/add', authenticateToken, createNewLogbookEntry);
router.post('/', authenticateToken, createNewLogbookEntry);

// Example: Protect multiple routes
// router.get('/', authenticateToken, getAllLogbookEntries);
router.get('/', authenticateToken, getAllLogbookEntries);

// Example: Protect update route
// router.put('/:id', authenticateToken, updateLogbookEntry);
router.put('/:id', updateLogbookEntry); // TODO: Add Auth back

// Example: Protect get by ID route
// router.get('/:id', authenticateToken, getLogbookEntryById);
router.get('/:id', getLogbookEntryById); // TODO: Add Auth back

// Example: Protect delete route
// router.delete('/:id', authenticateToken, deleteLogbookEntryById);
router.delete('/:id', deleteLogbookEntryById); // TODO: Add Auth back

export default router;
