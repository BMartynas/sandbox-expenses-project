import Transaction from '../models/transactions.js';

export default class TransactionsService {
  static async getTransactions(accountId) {
    const transactions = await Transaction.find({ accountId }).populate(
      'categories'
    );

    return transactions;
  }

  static async getTransaction(transactionId) {
    const transaction = await Transaction.findOne({
      _id: transactionId,
    }).populate('categories');
    return transaction;
  }

  static async createTransaction(transactionData, accountId) {
    const createdTransaction = await Transaction.create({
      ...transactionData,
      accountId,
    });
    return createdTransaction;
  }

  static async updateTransaction(transactionId, newTransactionData) {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: transactionId },
      newTransactionData,
      { new: true }
    );
    return updatedTransaction;
  }

  static async removeTransaction(transactionId) {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: transactionId,
    });
    return deletedTransaction;
  }
}
