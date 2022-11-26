import mongoose from "mongoose";
const transactionSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  desription: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  user_id: mongoose.Types.ObjectId,
  category_id: mongoose.Types.ObjectId,
});

export default mongoose.model("Transaction", transactionSchema);
