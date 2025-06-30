// server/middleware/security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

exports.configureSecurityMiddleware = (app) => {
  // Set security headers with Helmet
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Sanitize user input (prevents NoSQL injection)
  app.use(mongoSanitize());

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // Rate limiting - general API
  const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    message: {
      success: false,
      message: 'Too many requests, please try again later'
    }
  });
  app.use('/api', apiLimiter);

  // Rate limiting - authentication endpoints (more strict)
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    standardHeaders: true,
    message: {
      success: false,
      message: 'Too many login attempts, please try again later'
    }
  });
  app.use('/api/users/login', authLimiter);
  app.use('/api/users/register', authLimiter);

  return app;
};