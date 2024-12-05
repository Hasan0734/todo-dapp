const express = require("express");
const router = express.Router();
const {
  getTransactions,
  createTransaction,
} = require("../../controllers/transaction.controller");
const verifyToken = require("../../middleware/verifyToken");

router.route("/transactions").get(verifyToken, getTransactions).post(createTransaction);

module.exports = router;
