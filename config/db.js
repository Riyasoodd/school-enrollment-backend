// config/db.js
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("school-enrollment");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

module.exports = { connectToDatabase };
