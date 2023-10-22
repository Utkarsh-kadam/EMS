// models/FeedbackAnalysis.js

const mongoose = require("mongoose");

const FeedbackAnalysisSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  poMatrix: [
    {
      name: {
        type: String,
        required: true,
      },
      mapping: {
        type: String,
        required: true,
      },
    },
  ],
  psoMatrix: [
    {
      name: {
        type: String,
        required: true,
      },
      mapping: {
        type: String,
        required: true,
      },
    },
  ],
});

const FeedbackAnalysis = mongoose.model("FeedbackAnalysis", FeedbackAnalysisSchema);

module.exports = FeedbackAnalysis;
