// validation.middleware.js
import { body, param, query, validationResult } from 'express-validator';
import { AppError } from './error.middleware.js';

// Middleware to handle validations
export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(v => v.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return user-friendly messages
      const extractedErrors = errors.array().map(err => `${err.param}: ${err.msg}`);
      return next(new AppError(extractedErrors.join(", "), 400));
    }

    next();
  };
};

// Common validation rules
export const commonValidations = {
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive number'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ],

  objectId: (field) =>
    param(field)
      .isMongoId()
      .withMessage(`${field} is not a valid ID`),

  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),

  password: body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),

  firstname: body('firstname')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),

  lastname: body('lastname')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),

  username: body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
};

// User validations
export const validateSignup = validate([
  commonValidations.firstname,
  commonValidations.lastname,
  commonValidations.username,
  commonValidations.email,
  commonValidations.password
]);

export const validateSignin = validate([
  commonValidations.email,
  body('password')
    .notEmpty()
    .withMessage('Password is required')
]);

export const validatePasswordChange = validate([
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('New password must be different from current password');
      }
      return true;
    })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('New password must include at least one uppercase letter, one lowercase letter, one number, and one special character')
]);
