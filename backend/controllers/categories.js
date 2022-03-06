import categoriesService from '../services/categories.js';

export const getAll = (req, res) => {
  const categories = categoriesService.getCategories();
  res.json(categories);
};

export const getOne = (req, res) => {
  const category = categoriesService.getCategory(req.params.id);
  res.json(category);
};

export const create = (req, res) => {
  const categories = categoriesService.createCategory(req.body);
  res.status(200).json(categories);
};

export const update = (req, res) => {
  const categories = categoriesService.updateCategory(
    req.params.id,
    req.body.title
  );
  res.status(200).json(categories);
};

export const remove = (req, res) => {
  const categories = categoriesService.removeCategory(req.params.id);
  res.status(200).json(categories);
};
