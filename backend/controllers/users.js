import { StatusCodes } from 'http-status-codes';
import usersService from '../services/users.js';

export const create = async (req, res) => {
  try {
    const createdUser = await usersService.register(req.body);
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
