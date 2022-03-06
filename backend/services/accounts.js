import mockedAccounts from '../mockData/accounts.js';

export default class AccountsService {
  static getAccounts() {
    return mockedAccounts;
  }

  static getAccount(id) {
    const account = mockedAccounts.find((acc) => acc.id === id);
    return account;
  }

  static createAccount(newAccount) {
    return mockedAccounts.push(newAccount);
  }

  static updateAccount(id, newTitle) {
    const account = mockedAccounts.find((acc) => acc.id === id);
    account.title = newTitle;
    return account;
  }

  static removeAccount(id) {
    return mockedAccounts.filter((acc) => acc.id != id);
  }
}
