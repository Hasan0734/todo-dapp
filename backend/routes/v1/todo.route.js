const express = require("express");
const router = express.Router();
const transactionController = require("../../controllers/transaction.controller");

router.use("/health", (req, res) => {
  res.status(200).json({
    message: "Server is active",
    status: "success",
  });
});
router.route("/transactions").get(transactionController.getTransactions).post(transactionController.createTransaction);

module.exports = router;
