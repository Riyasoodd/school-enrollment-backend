// controllers/lessonController.js
const { connectToDatabase } = require("../config/db");

async function getLessons(req, res) {
  try {
    const db = await connectToDatabase();
    const lessons = await db.collection("lessons").find({}).toArray();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
}

module.exports = { getLessons };
