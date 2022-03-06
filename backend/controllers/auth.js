import authService from '../services/auth.js';

export const login = (req, res) => {
  const response = authService.login();
  res.json({ message: response });
};

export const logout = (req, res) => {
  const response = authService.logout();
  res.json({ message: response });
};
