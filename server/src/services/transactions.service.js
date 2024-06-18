//model ;
const Transactions = require("../model/transactions.model");

const saveAll = async (data) => {
  try {
    const transaction = await Transactions.create(data);
    return transaction;
  } catch (error) {
    throw error;
  }
};
const fetch = async (month) => {
  try {
    if (month) return getTransactionsByMonth(month);
    const res = await Transactions.find();
    return res;
  } catch (error) {
    throw error;
  }
};

const getTransactionsByMonth = async (month) => {
  try {
    const transactions = await Transactions.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month],
      },
    });
    return transactions;
  } catch (error) {
    console.error("Error querying transactions:", error);
    throw error;
  }
};

module.exports = { saveAll, fetch };
