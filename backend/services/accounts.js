import Account from '../models/accounts.js';

export default class AccountsService {
  static getAccounts(userId) {
    const accounts = Account.find({ userId });
    return accounts;
  }

  static getAccount(accountId, userId) {
    const account = Account.findOne({ _id: accountId, userId });
    return account;
  }

  static createAccount(accountData, userId) {
    const createdAccount = Account.create({ ...accountData, userId });
    return createdAccount;
  }

  static updateAccount(accountId, newAccountData, userId) {
    const updatedAccount = Account.findOneAndUpdate(
      { _id: accountId, userId },
      newAccountData,
      { new: true }
    );
    return updatedAccount;
  }

  static removeAccount(accountId, userId) {
    return Account.findOneAndDelete({ _id: accountId, userId });
  }
}
