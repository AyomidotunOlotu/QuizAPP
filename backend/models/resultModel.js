const mongoose = require("mongoose");

const performanceEnum = ["Excellent", "Good", "Average", "Needs Work"];

const ResultSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    technology: {
      type: String,
      required: true,
      trim: true,
      enum: ["html", "css", "js", "react", "node", "mongodb", "java", "python", "cpp", "bootstrap"],
    },
    level: {
      type: String,
      required: true,
      enum: ["basic", "intermediate", "advanced"],
    },
    totalQuestions: { type: Number, required: true, min: 0 },
    correct: { type: Number, required: true, min: 0, default: 0 },
    wrong: { type: Number, required: true, min: 0, default: 0 },
    score: { type: Number, min: 0, max: 100, default: 0 },
    performance: {
      type: String,
      enum: performanceEnum,
      default: "Needs Work",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Auto-calculate score and performance before saving
ResultSchema.pre("save", function (next) {
  if (this.totalQuestions > 0) {
    this.score = Math.round((this.correct / this.totalQuestions) * 100);
  }
  if (this.score >= 85) this.performance = "Excellent";
  else if (this.score >= 65) this.performance = "Good";
  else if (this.score >= 45) this.performance = "Average";
  else this.performance = "Needs Work";
  next();
});

module.exports = mongoose.model("Result", ResultSchema);
