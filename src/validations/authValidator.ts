import { body } from 'express-validator'
import { validateResult } from './validateResult'

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  validateResult,
]

export const validateRegister = [
  body('firstName').notEmpty().withMessage('Name is required'),
  body('lastName').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  validateResult,
]

export const validateLogout = [
  body('token').notEmpty().withMessage('Token is required'),
  validateResult,
]
