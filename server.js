require('dotenv').config();
console.log("Mongo URI:", process.env.MONGODB_URI); // Should print the Mongo URI

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI; // Updated variable name
const client = new MongoClient(MONGO_URI);

app.use(cors());
app.use(express.json());

app.get("/api/lessons", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("schoolEnrollment");
    const lessons = database.collection("lessons");
    const lessonList = await lessons.find({}).toArray();
    res.json(lessonList);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).send("Error fetching lessons");
  } finally {
    await client.close();
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("schoolEnrollment");
    const orders = database.collection("orders");
    const order = req.body;
    const result = await orders.insertOne(order);
    res.status(201).json({ message: "Order placed successfully", orderId: result.insertedId });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send("Error placing order");
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
