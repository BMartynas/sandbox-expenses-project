import { StatusCodes } from 'http-status-codes';
import authService from '../services/auth.js';

export const login = (req, res) => {
  const { email, password } = req.body;

  const token = authService.login(email, password);

  if (token) {
    res.status(StatusCodes.OK).json({ token });
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid crediantials!' });
  }
};

export const logout = (req, res) => {
  const response = authService.logout();
  res.status(StatusCodes.OK).json({ message: response });
};
