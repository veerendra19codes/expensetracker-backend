import express from "express";
import cors from "cors";
import {} from 'dotenv/config';
import mongoose from "mongoose";
import Transaction from "./models/Transaction.js";
const PORT = process.env.PORT || 3001

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.get("/api/test", (req, res) => {
    res.json("test ok");
});

app.post("/api/transaction", async (req, res) => {
    const {name, description, datetime, price } = req.body;
        //object from db      //model/Schema
    const transaction = await Transaction.create({name, description, datetime, price});
    res.json(transaction);
});

//  Route to handle transaction updates by ID
app.put("/api/transaction/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, datetime, price } = req.body;

  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.name = name;
    transaction.description = description;
    transaction.datetime = datetime;
    transaction.price = price;
    await transaction.save();
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error: error.message });
  }
});


app.delete("/api/transaction/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error: error.message });
  }
});

app.get("/api/transactions", async(req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(PORT, console.log(`server running on PORT : ${PORT}`));
