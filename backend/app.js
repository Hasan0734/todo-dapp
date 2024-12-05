const express = require("express");
const app = express();
const cors = require("cors");
const todoRoute = require("./routes/v1/todo.route");
const authRoute = require("./routes/v1/auth.route");
const session = require("express-session");
const cookieParser = require("cookie-parser");

require("dotenv").config();
//middlewares
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST"], // Specify allowed methods
  credentials: true, // Allow credentials (e.g., cookies)
};

app.use(cors(corsOptions));

//session
app.use(
  session({
    secret: "your-secret-key", // Secret key to sign the session ID cookie
    resave: false, // Don't save session if not modified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: {
      secure: false,
      maxAge: 3600000, // Session cookie expiration (1 hour)
    },
  })
);

//routes
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    message: "Server is active",
    status: "success",
  });
});
app.use("/api/v1/", todoRoute);
app.use("/api/v1/auth", authRoute);


//not found
app.use("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: "Endpoint not found!",
  });
});

module.exports = app;
