const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Verify JWT token and protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token (exclude password)
      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: 'Admin not found'
        });
      }

      if (!req.admin.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Admin account is deactivated'
        });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      
      let message = 'Not authorized';
      
      if (error.name === 'JsonWebTokenError') {
        message = 'Invalid token';
      } else if (error.name === 'TokenExpiredError') {
        message = 'Token expired';
      }
      
      return res.status(401).json({
        success: false,
        message
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided, authorization denied'
    });
  }
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token expires in 30 days
  });
};

// Optional: Middleware to check if user is superadmin
const superAdminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Super admin privileges required.'
    });
  }
};

module.exports = { protect, generateToken, superAdminOnly };
