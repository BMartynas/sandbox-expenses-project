import bcrypt from 'bcrypt';

const saltRounds = 10;

const mockedUsers = [
  {
    id: 1,
    email: 'user1@gmail.com',
    password: bcrypt.hashSync('user1', saltRounds),
    role: 'USER',
  },
  {
    id: 2,
    email: 'user2@gmail.com',
    password: bcrypt.hashSync('user2', saltRounds),
    role: 'ADMIN',
  },
];

export default mockedUsers;
