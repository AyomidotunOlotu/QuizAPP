const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Result = require("../models/resultModel");

const JWT_SECRET = process.env.JWT_SECRET || "quizapp_secret_key";

// Auth middleware
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// GET /api/results — get all results for logged in user
router.get("/", protect, async (req, res) => {
  try {
    const filter = { user: req.user.id };
    if (req.query.technology && req.query.technology !== "all") {
      filter.technology = req.query.technology;
    }
    const results = await Result.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/results — save a new result
router.post("/", protect, async (req, res) => {
  try {
    const { title, technology, level, totalQuestions, correct, wrong } = req.body;

    const computedWrong =
      wrong !== undefined
        ? Number(wrong)
        : Math.max(0, Number(totalQuestions) - Number(correct));

    const result = await Result.create({
      title: title ? String(title).trim() : technology,
      technology,
      level,
      totalQuestions: Number(totalQuestions),
      correct: Number(correct),
      wrong: computedWrong,
      user: req.user.id,
    });

    res.status(201).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/results/:id — delete a result
router.delete("/:id", protect, async (req, res) => {
  try {
    const result = await Result.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!result) {
      return res.status(404).json({ success: false, message: "Result not found" });
    }
    res.json({ success: true, message: "Result deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
