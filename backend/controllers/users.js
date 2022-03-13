import usersService from '../services/users.js';

export const create = (req, res) => {
  const users = usersService.register(req.body);
  res.status(200).json(users);
};
