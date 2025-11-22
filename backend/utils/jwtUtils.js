import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for a user
 *
 * @param {Object} payload - The data to encode in the token (typically user ID and role)
 * @param {string} expiresIn - Token expiration time (e.g., '1h', '7d', '30d')
 * @returns {string} JWT token
 *
 * @example
 * const token = generateToken({ userId: user._id, email: user.email, role: user.role }, '7d');
 */
export const generateToken = (payload, expiresIn = '7d') => {
  const JWT_SECRET =
    process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

/**
 * Verify and decode a JWT token
 *
 * @param {string} token - The JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export const verifyToken = (token) => {
  const JWT_SECRET =
    process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  return jwt.verify(token, JWT_SECRET);
};
