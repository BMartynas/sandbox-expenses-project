import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: [true, 'User id is required!'],
  },
  currency: {
    type: mongoose.ObjectId,
    ref: 'Currency',
    required: [true, 'Currency id is required!'],
  },
  name: {
    type: String,
    maxlength: 128,
    required: [true, 'Name is required!'],
  },
  amount: {
    type: Number,
    min: 0,
    required: [true, 'Amount of account is required!'],
  },
  description: {
    type: String,
    maxlength: 256,
  },
});

export default mongoose.model('Account', accountSchema);
