const {
  createTransactionService,
  getTransactionsService,
} = require("../services/transaction.service");

exports.getTransactions = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((field) => delete filters[field]);

    let queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    const result = await getTransactionsService(filters, queries);

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const result = await createTransactionService(req.body);
    res.status(200).json({
      status: "success",
      message: "Transaction inserted successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Transaction not inserted.",
      error: error.message,
    });
  }
};
