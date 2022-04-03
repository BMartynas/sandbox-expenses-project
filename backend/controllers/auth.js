import { StatusCodes } from 'http-status-codes';
import authService from '../services/auth.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);

    if (token) {
      res
        .status(StatusCodes.OK)
        .json({ token, expiresIn: process.env.JWT_EXPIRES_IN });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid crediantials!' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const logout = (req, res) => {
  const response = authService.logout();
  res.status(StatusCodes.OK).json({ message: response });
};
