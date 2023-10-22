// rppModel.js

const mongoose = require("mongoose");

const rppSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  workingExperience: {
    type: Number,
    required: true,
  },
  areaOfExpertise: {
    type: String,
    required: true,
  },
  achievements: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RPP", rppSchema);
