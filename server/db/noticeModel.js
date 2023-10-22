// noticeModel.js
const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  nameofRpp: {
    type: String,
    required: true,
  },
  partAud: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Notice", noticeSchema);
