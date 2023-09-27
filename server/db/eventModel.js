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

  startDate: {
    type: Date,
    required: true,      
  },
  endDate: {
    type: Date,
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

    eventpassword: {
      type: String,
    },

  })
  module.exports = mongoose.model.Events || mongoose.model("Events", EventSchema);

