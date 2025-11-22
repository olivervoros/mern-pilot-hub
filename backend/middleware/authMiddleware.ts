import jwt from 'jsonwebtoken';
import type { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

/**
 * Extended Express Request interface to include user property
 */
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & {
    token: string;
    [key: string]: any;
  };
}

/**
 * JWT Authentication Middleware
 *
 * This middleware verifies JWT tokens from the Authorization header.
 * Expected header format: "Bearer <token>"
 *
 * On success, attaches the decoded user info to req.user
 * On failure, returns 401 Unauthorized
 */
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if Authorization header exists
    if (!authHeader) {
      res.status(401).json({
        message: 'Access denied. No token provided.',
      });
      return;
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    // Check if token exists
    if (!token) {
      res.status(401).json({
        message: 'Access denied. Invalid token format.',
      });
      return;
    }

    // Verify the token
    // Use environment variable for JWT secret, fallback to default for development
    const JWT_SECRET =
      process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err) {
        res.status(403).json({
          message: 'Access denied. Invalid or expired token.',
        });
        return;
      }

      // Attach decoded user info and token to request object
      req.user = {
        ...(decoded as JwtPayload),
        token,
      };
      next();
    });
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.status(500).json({
      message: 'Internal server error during authentication.',
    });
  }
};

/**
 * Optional: Middleware to check if user has specific role
 * Usage: Use after authenticateToken middleware
 */
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        message: 'Access denied. User not authenticated.',
      });
      return;
    }

    // Check if user has a role property and if it's in the allowed roles
    const userRole = req.user.role as string | undefined;
    if (!userRole || !roles.includes(userRole)) {
      res.status(403).json({
        message: 'Access denied. Insufficient permissions.',
      });
      return;
    }

    next();
  };
};

