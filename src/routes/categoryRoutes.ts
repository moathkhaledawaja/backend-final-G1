import { Router } from 'express'
import { container } from 'tsyringe'
import { CategoryController } from '../controllers/CategoryController'
import {
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../validations/categoryValidator'

const categoryRoutes = Router()
const categoryController = container.resolve(CategoryController)

categoryRoutes.get(
  '/',
  categoryController.getAllCategories.bind(categoryController)
)
categoryRoutes.get(
  '/:id',
  getCategoryById,
  categoryController.getCategoryByID.bind(categoryController)
)
categoryRoutes.post(
  '/',
  createCategory,
  categoryController.createCategory.bind(categoryController)
)
categoryRoutes.put(
  '/:id',
  updateCategory,
  categoryController.updateCategory.bind(categoryController)
)
categoryRoutes.delete(
  '/:id',
  deleteCategory,
  categoryController.deleteCategory.bind(categoryController)
)

export default categoryRoutes
