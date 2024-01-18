
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  name: String,
  description: String,
  datetime: Date,
  price: Number,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
