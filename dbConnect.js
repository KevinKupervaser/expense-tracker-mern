const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.REACT_APP_BASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("connected", () => console.log("mongo db connection succesfull"));
