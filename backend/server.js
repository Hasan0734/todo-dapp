const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

//database connection
mongoose.connect(process.env.DATABASE, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
}).then(() => {
    console.log("Database connection is successfull")
})
//server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
