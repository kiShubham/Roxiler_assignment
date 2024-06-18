const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
});
const Transactions = mongoose.model("Transactions", transactionSchema);
module.exports = Transactions;
