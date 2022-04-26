import Account from '../models/accounts.js';
import Transaction from '../models/transactions.js';

export default class AccountsService {
  static async getAccounts(userId) {
    const accounts = await Account.find({ userId }).populate('currency');
    return accounts;
  }

  static async getAccount(accountId, userId) {
    const account = await Account.findOne()
      .where('_id')
      .in(accountId)
      .populate('currency');
    return account;
  }

  static async getAccountCurrency(accountId, userId) {
    const { currency } = await Account.findOne()
      .where('_id')
      .in(accountId)
      .populate('currency');
    return currency;
  }

  static async createAccount(accountData, userId) {
    const createdAccount = await Account.create({ ...accountData, userId });
    return createdAccount;
  }

  static async updateAccount(accountId, newAccountData, userId) {
    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      newAccountData,
      { new: true }
    );
    return updatedAccount;
  }

  static async removeAccount(accountId, userId) {
    const deletedAccount = await Account.findOneAndDelete({
      _id: accountId,
      userId,
    });
    await Transaction.deleteMany({
      accountId,
    });
    return deletedAccount;
  }
}
