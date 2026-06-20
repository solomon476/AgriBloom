import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-change-me-in-production';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
