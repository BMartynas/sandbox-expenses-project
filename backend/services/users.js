import bcrypt from 'bcrypt';
import mockedUsers from '../mockData/users.js';

export default class UsersService {
  static getUserByEmail(email) {
    const user = mockedUsers.find((user) => user.email === email);
    return user;
  }

  static register(user) {
    let newUser = {
      id: Math.random(),
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
      role: user.role,
    };
    mockedUsers.push(newUser);

    delete newUser.password;

    return newUser;
  }
}
