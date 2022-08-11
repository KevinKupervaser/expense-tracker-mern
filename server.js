const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
app.use(express.json());
const path = require("path");
const userRoute = require("./routes/usersRoute");
const transactionRoutes = require("./routes/transactionsRoute");

app.use("/api/users/", userRoute);
app.use("/api/transactions/", transactionRoutes);

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("expense-tracker-app/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "expense-tracker-app/build/index.html")
    );
  });
}

app.listen(port, () => console.log(`Node JS server started at port ${port}`));
