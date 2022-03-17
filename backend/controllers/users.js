import { StatusCodes } from 'http-status-codes';
import usersService from '../services/users.js';

export const create = (req, res) => {
  const user = usersService.register(req.body);
  res.status(StatusCodes.CREATED).json(user);
};
