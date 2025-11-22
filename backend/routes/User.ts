import express, { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/UserController.ts';

const router: Router = express.Router();

// Create new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get single user by ID
router.get('/:id', getUserById);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

export default router;

