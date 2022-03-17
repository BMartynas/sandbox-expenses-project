import bcrypt from 'bcrypt';
import mockedUsers from '../mockData/users.js';

export default class UsersService {
  static getUserByEmail(email) {
    const user = mockedUsers.find((user) => user.email === email);
    return user;
  }

  static register({ password, ...rest }) {
    let newUser = {
      id: Math.random(),
      password: bcrypt.hashSync(password, 10),
      ...rest,
    };
    mockedUsers.push(newUser);

    delete newUser.password;

    return newUser;
  }
}
