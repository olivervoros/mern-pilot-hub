import type { Request, Response } from 'express';
import User from '../models/User.ts';
import bcrypt from 'bcrypt';

/**
 * Create a new user
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: 'Name, email, and password are required.',
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        message: 'User with this email already exists.',
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //const user = await User.create({ name, email, password: hashedPassword });

    console.log(result);

    res.status(201).json({ success: `New user ${email} created!` });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : 'Internal server error while creating user.';
    res.status(500).json({ message });
  }
};

/**
 * Get all users
 */
export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Internal server error while fetching users.',
    });
  }
};

/**
 * Get specific user by ID
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: 'User not found.',
      });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      message: 'Internal server error while fetching user.',
    });
  }
};

/**
 * Update an existing user
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      res.status(404).json({
        message: 'User not found.',
      });
      return;
    }

    res.status(200).json({
      message: 'User updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      message: 'Internal server error while updating user.',
    });
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({
        message: 'User not found.',
      });
      return;
    }

    res.status(200).json({
      message: 'User deleted successfully.',
      user: deletedUser,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Internal server error while deleting user.',
    });
  }
};
