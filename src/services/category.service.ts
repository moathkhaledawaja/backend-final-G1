/* eslint-disable @typescript-eslint/no-explicit-any */

import { categoryRepository } from '../data-access'
import { Category } from '../models'
import { CategoryDTO } from '../Types/DTO'

export default class CategoryService {
  async createCategory(categoryData: CategoryDTO): Promise<Category> {
    try {
      const newCategory = new Category()
      newCategory.name = categoryData.name
      const category = await categoryRepository.create(newCategory)

      if (!category) {
        throw new Error('Failed to create category  `')
      }
      return category
    } catch (error: any) {
      throw new Error(`Error creating category${error.message}`)
    }
  }

  async updateCategory(
    categoryId: number,
    categoryData: CategoryDTO
  ): Promise<Category> {
    try {
      const oldCategory = await categoryRepository.findById(categoryId)
      if (!oldCategory) {
        throw new Error("Category Doesn't exist")
      }

      oldCategory.name = categoryData.name
      const category = await categoryRepository.update(oldCategory)
      if (!category) {
        throw new Error('Failed to update category')
      }
      return category
    } catch (error: any) {
      throw new Error(`Error while updating category ${error.message}`)
    }
  }

  // all find methods
  async findById(id: number): Promise<Category | null> {
    try {
      const category = await categoryRepository.findById(id)
      return category
    } catch (error: any) {
      throw new Error(`Error retrieving category ${error.message}`)
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await categoryRepository.findAll()
      return categories
    } catch (error: any) {
      throw new Error(`Error retrieving Categories ${error.message}`)
    }
  }
  async findByName(name: string): Promise<Category | null> {
    try {
      const category = await categoryRepository.findByName(name)
      return category
    } catch (error: any) {
      throw new Error(`Error retrieving Category ${error.message}`)
    }
  }

  async deleteCategory(CategoryId: number): Promise<boolean> {
    try {
      // check if category exists
      const category = await categoryRepository.findById(CategoryId)
      if (!category) {
        throw new Error('Category not found')
      }

      const deletedCategory = await categoryRepository.delete(CategoryId)

      return deletedCategory
    } catch (error: any) {
      throw new Error(`Error while deleting category ${error.message}`)
    }

  }
}
