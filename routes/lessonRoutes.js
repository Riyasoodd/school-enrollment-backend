// routes/lessonRoutes.js
const express = require("express");
const { getLessons } = require("../controllers/lessonController");
const router = express.Router();

router.get("/lessons", getLessons);

module.exports = router;
