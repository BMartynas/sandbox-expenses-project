import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.ObjectId,
    ref: 'Account',
    required: [true, 'Account id is required!'],
  },
  type: {
    type: String,
    required: [true, 'Type is required!'],
    enum: ['income', 'expenses'],
  },
  title: {
    type: String,
    required: [true, 'Title is required!'],
  },
  categories: [
    {
      type: mongoose.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required!'],
    },
  ],
  description: {
    type: String,
  },
  dateOfTransaction: {
    type: Date,
    required: [true, 'Date of transaction is required!'],
  },
  payee: {
    type: String,
  },
  amount: {
    type: Number,
    min: 0,
    required: [true, 'Amount of transaction is required!'],
  },
});

export default mongoose.model('Transaction', transactionSchema);
