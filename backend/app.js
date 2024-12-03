const express = require("express");
const app = express();
const cors = require("cors");
const todoRoute = require('./routes/v1/todo.route')

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/", todoRoute);

//not found
app.use("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: "Endpoint not found!",
  });
});

module.exports = app;
