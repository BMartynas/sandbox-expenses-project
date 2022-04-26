import Category from '../models/categories.js';
import Transaction from '../models/transactions.js';

export default class CategoriesService {
  static async getCategories(userId) {
    const categories = await Category.find({ userId });
    return categories;
  }

  static async getCategory(categoryId, userId) {
    const category = await Category.findOne({ _id: categoryId, userId });
    return category;
  }

  static async createCategory(categoryData, userId) {
    const createdCategory = await Category.create({ ...categoryData, userId });
    return createdCategory;
  }

  static async updateCategory(categoryId, newCategoryData) {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      newCategoryData,
      { new: true }
    );
    return updatedCategory;
  }

  static async removeCategory(categoryId, userId) {
    const transactionsWithThisCategory = await Transaction.find({
      categories: categoryId,
    });
    if (transactionsWithThisCategory.length !== 0) return null;
    const deletedCategory = await Category.findOneAndDelete({
      _id: categoryId,
      userId,
    });
    return deletedCategory;
  }
}
