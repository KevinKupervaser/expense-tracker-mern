const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
app.use(express.json());
const path = require("path");
const userRoute = require("./routes/usersRoute");
const transactionRoutes = require("./routes/transactionsRoute");
require("dotenv").config();

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoutes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Node JS server started at port ${port}`));
