import authService from '../services/auth.js';

export const login = (req, res) => {
  const { email, password } = req.body;

  const token = authService.login(email, password);

  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid crediantials!' });
  }
};

export const logout = (req, res) => {
  const response = authService.logout();
  res.json({ message: response });
};
