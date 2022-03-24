import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: [true, 'User id is required!'],
  },
  title: {
    type: String,
    required: [true, 'Title is required!'],
    maxlength: 128,
  },
  type: {
    type: String,
    required: [true, 'Type is required!'],
    enum: ['income', 'expenses'],
  },
});

export default mongoose.model('Category', categorySchema);
