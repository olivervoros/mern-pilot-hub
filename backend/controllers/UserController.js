import User from '../models/User.js';

/**
 * Create a new user
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required.',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User with this email already exists.',
      });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User created successfully.',
      user,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Internal server error while creating user.',
    });
  }
};

/**
 * Get all users
 */
export const getAllUsers = async (_req, res) => {
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
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
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
export const updateUser = async (req, res) => {
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
      return res.status(404).json({
        message: 'User not found.',
      });
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
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found.',
      });
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
