import User from '../models/users.js';

export default class UsersService {
  static getUserByEmail(email) {
    const user = User.findOne({ email });
    return user;
  }

  static register(user) {
    return User.create(user);
  }
}
