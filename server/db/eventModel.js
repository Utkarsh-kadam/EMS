const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required:true,      
  },

  organizer: {
    type: String,
    required: true,      
  },

  date: {
    type: String,
    required: true,      
  },

  time: {
        type: String,
        required: true,
      },

  venue: {
        type: String,
        required: true,      
      },
  imageUrl: {
        type: String,
        required: true,
    },
    registeredUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel', // Reference to the User model
    }],

      
  })
  module.exports = mongoose.model.Events || mongoose.model("Events", EventSchema);

  