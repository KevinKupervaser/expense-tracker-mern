const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://kevingregori1992:martinembon1992@cluster01.nfwsyqf.mongodb.net/moneyapp",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("connected", () =>
  console.log("Mongo DB Connection Successfull")
);
