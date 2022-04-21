import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Code is required!'],
  },
  symbol: {
    type: String,
    required: [true, 'Symbol is required!'],
  },
  name: {
    type: String,
    required: [true, 'Name is required!'],
    maxlength: 128,
  },
  country: {
    type: String,
    required: [true, 'Names of country using this currency is required!'],
  },
});

export default mongoose.model('Currency', currencySchema);
