import Transaction from '../models/transactions.js';

export default class TransactionsService {
  static getTransactions(accountId) {
    const transactions = Transaction.find({ accountId });
    return transactions;
  }

  static getTransaction(transactionId) {
    const transaction = Transaction.findOne({ _id: transactionId });
    return transaction;
  }

  static createTransaction(transactionData, accountId) {
    const createdTransaction = Transaction.create({
      ...transactionData,
      accountId,
    });
    return createdTransaction;
  }

  static updateTransaction(transactionId, newTransactionData) {
    const updatedTransaction = Transaction.findOneAndUpdate(
      { _id: transactionId },
      newTransactionData,
      { new: true }
    );
    return updatedTransaction;
  }

  static removeTransaction(transactionId) {
    return Transaction.findOneAndDelete({ _id: transactionId });
  }
}
