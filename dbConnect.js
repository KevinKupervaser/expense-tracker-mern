const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://kevingregori1992:kevingregori1992@cluster0.qjb5b.mongodb.net/appmoney",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("connected", () =>
  console.log("Mongo DB Connection Successfull")
);
