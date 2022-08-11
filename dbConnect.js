const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://kevinkupervaser:martinembon1992@cluster0.2ltvv.mongodb.net/money-tracker-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("connected", () => console.log("mongo db connection succesfull"));
