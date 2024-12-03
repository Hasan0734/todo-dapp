const Transaction = require("../models/Transaction");

exports.getTransactionsService = async (filters, queries) => {
  const transactions = await Transaction.find();
  const total = await Transaction.countDocuments();
  const page = Math.ceil(total / queries.limit);
  return { transactions, total, page };
};

exports.createTransactionService = async (newTransaction) => {
  const result = await Transaction.create(newTransaction);
  return result;
};
