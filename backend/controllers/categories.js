import { StatusCodes } from 'http-status-codes';
import categoriesService from '../services/categories.js';

export const getAll = async (req, res) => {
  try {
    const categories = await categoriesService.getCategories(req.user.id);
    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const category = await categoriesService.getCategory(
      req.params.id,
      req.user.id
    );
    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const category = await categoriesService.createCategory(
      req.body,
      req.user.id
    );
    res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const category = await categoriesService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const category = await categoriesService.removeCategory(
      req.params.id,
      req.user.id
    );
    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
