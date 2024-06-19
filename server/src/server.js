require("dotenv").config({ path: "src/.env" });
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const transactionRoutes = require("./routes/transactions.routes");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to database 🎆"))
  .catch((error) =>
    console.log("facing error in connecting to database", error)
  );

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/transactions", transactionRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}!`));
