import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import usersService from '../services/users.js';

export default class AuthService {
  static async login(email, password) {
    const user = await usersService.getUserByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return token;
    }
    return null;
  }

  static logout() {
    return 'You have successfully logged out!';
  }
}
