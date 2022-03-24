import User from '../models/users.js';

export default class UsersService {
  static async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  static async register(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }
}
