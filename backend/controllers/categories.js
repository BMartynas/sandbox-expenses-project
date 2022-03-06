import CategoriesService from '../services/categories.js';

export const getAll = (req, res) => {
  const categories = CategoriesService.getCategories();
  res.json(categories);
};

export const getOne = (req, res) => {
  const category = CategoriesService.getCategory(req.params.id);
  res.json(category);
};

export const create = (req, res) => {
  const categories = CategoriesService.createCategory(req.body);
  res.status(200).json(categories);
};

export const update = (req, res) => {
  const categories = CategoriesService.updateCategory(
    req.params.id,
    req.body.title
  );
  res.status(200).json(categories);
};

export const remove = (req, res) => {
  const categories = CategoriesService.removeCategory(req.params.id);
  res.status(200).json(categories);
};
