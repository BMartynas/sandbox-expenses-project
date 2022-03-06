import AuthService from '../services/auth.js';

export const login = (req, res) => {
  const response = AuthService.login();
  res.json({ message: response });
};

export const logout = (req, res) => {
  const response = AuthService.logout();
  res.json({ message: response });
};
