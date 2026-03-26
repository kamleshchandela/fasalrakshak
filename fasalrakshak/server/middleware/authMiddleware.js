import jwt from 'jsonwebtoken';
import Kisan from '../models/Kisan.js';

export const protect = async (req, res, next) => {
  let token;

  // Check cookies first
  if (req.cookies && req.cookies.fasal_token) {
    token = req.cookies.fasal_token;
  } 
  // Fallback to headers
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Kisan.findById(decoded.id).select('-pin');
    
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};
