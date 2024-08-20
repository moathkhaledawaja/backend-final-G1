import { body, param } from 'express-validator'
import { validateResult } from './validateResult'

export const getCategoryById = [
  param('id').notEmpty().isInt().toInt(),
  validateResult,
]

export const createCategory = [
  body('name').notEmpty().withMessage('Name is required'),
  body('name').isString().withMessage('Name must be String'),
  validateResult,
]

export const updateCategory = [
  param('id').isInt().toInt().withMessage('CategoryId must be an integer'),
  body('name').isString().withMessage('Category name must be a string'),
  body('name').notEmpty().withMessage('Category Name is required'),
  validateResult,
]

export const deleteCategory = [
  param('id').isInt().toInt().withMessage('CategoryId must be an integer'),
  validateResult,
]
