import jwt from 'jsonwebtoken';

/**
 * JWT Authentication Middleware
 *
 * This middleware verifies JWT tokens from the Authorization header.
 * Expected header format: "Bearer <token>"
 *
 * On success, attaches the decoded user info to req.user
 * On failure, returns 401 Unauthorized
 */
export const authenticateToken = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        message: 'Access denied. No token provided.',
      });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: 'Access denied. Invalid token format.',
      });
    }

    // Verify the token
    // Use environment variable for JWT secret, fallback to default for development
    const JWT_SECRET =
      process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'Access denied. Invalid or expired token.',
        });
      }

      // Attach decoded user info and token to request object
      req.user = {
        ...decoded,
        token,
      };
      next();
    });
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return res.status(500).json({
      message: 'Internal server error during authentication.',
    });
  }
};

/**
 * Optional: Middleware to check if user has specific role
 * Usage: Use after authenticateToken middleware
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Access denied. User not authenticated.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied. Insufficient permissions.',
      });
    }

    next();
  };
};
