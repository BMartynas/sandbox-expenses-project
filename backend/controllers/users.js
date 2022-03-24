import { StatusCodes } from 'http-status-codes';
import usersService from '../services/users.js';
import { handleError } from '../utils/errors.js';

export const create = async (req, res) => {
  try {
    const createdUser = await usersService.register(req.body);
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error) {
    handleError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
