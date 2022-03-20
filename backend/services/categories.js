import Category from '../models/categories.js';

export default class CategoriesService {
  static getCategories(userId) {
    const categories = Category.find({ userId });
    return categories;
  }

  static getCategory(categoryId, userId) {
    const category = Category.findOne({ _id: categoryId, userId });
    return category;
  }

  static createCategory(categoryData, userId) {
    const createdCategory = Category.create({ ...categoryData, userId });
    return createdCategory;
  }

  static updateCategory(categoryId, newCategoryData, userId) {
    const updatedCategory = Category.findOneAndUpdate(
      { _id: categoryId, userId },
      newCategoryData,
      { new: true }
    );
    return updatedCategory;
  }

  static removeCategory(categoryId, userId) {
    return Category.findOneAndDelete({ _id: categoryId, userId });
  }
}
