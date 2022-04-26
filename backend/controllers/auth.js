import { StatusCodes } from 'http-status-codes';
import authService from '../services/auth.js';
import UsersService from '../services/users.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    const user = await UsersService.getUserByEmail(email);

    if (token) {
      res.status(StatusCodes.OK).json({
        token,
        expiresIn: process.env.JWT_EXPIRES_IN,
        fullName: `${user.firstName} ${user.lastName}`,
        country: user.country,
      });
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
