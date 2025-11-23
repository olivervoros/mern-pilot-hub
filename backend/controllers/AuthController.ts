import User from '../models/User.ts';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Interface for login request body
 */
interface LoginRequestBody {
  email: string;
  password: string;
}

/**
 * Handle user login
 * Validates credentials and issues JWT access and refresh tokens
 */
export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body as LoginRequestBody;
    console.log(email, password);

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        message: 'Email address and password are required.',
      });
      return;
    }

    // Find user by email
    const foundUser = await User.findOne({ email }).exec();
    console.log(foundUser);
    if (!foundUser) {
      res.status(401).json({
        message: 'Invalid credentials.',
      });
      return;
    }

    // Evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    console.log(match);
    if (!match) {
      res.status(401).json({
        message: 'Invalid credentials.',
      });
      return;
    }

    // Get JWT secrets from environment
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessTokenSecret || !refreshTokenSecret) {
      res.status(500).json({
        message: 'Server configuration error. Missing JWT secrets.',
      });
      return;
    }

    // Create access token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
        },
      },
      accessTokenSecret,
      { expiresIn: '1d' }
    );

    // Create refresh token
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      refreshTokenSecret,
      { expiresIn: '1d' }
    );

    // Save refresh token to user document
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false, // CHANGE TO TRUE IN PROD
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send access token to user
    res.json({ accessToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      message: 'Internal server error during login.',
    });
  }
};
