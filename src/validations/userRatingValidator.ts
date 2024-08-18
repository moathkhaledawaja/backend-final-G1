import { body } from 'express-validator'
import { validateResult } from './validateResult'

export const createAndUpdateUserRatingValidator = [
  body('rating').isInt({ min: 1, max: 5 }).toInt(),
  validateResult,
]
