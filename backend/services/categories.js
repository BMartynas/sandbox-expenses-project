import mockedCategories from '../mockData/categories.js';

export default class CategoriesService {
  static getCategories() {
    return mockedCategories;
  }

  static getCategory(id) {
    const category = mockedCategories.find((cat) => cat.id === id);
    return category;
  }

  static createCategory(newCategory) {
    return mockedCategories.push(newCategory);
  }

  static updateCategory(id, newTitle) {
    const category = mockedCategories.find((cat) => cat.id === id);
    category.title = newTitle;
    return category;
  }

  static removeCategory(id) {
    return mockedCategories.filter((cat) => cat.id != id);
  }
}
