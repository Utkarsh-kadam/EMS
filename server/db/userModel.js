const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a name!"],
  },
  contact: {
    type: Number,
    required: [true, "Please provide a Contact!"],      
  },
  college: {
    type: String,
    required: [true, "Please provide a College!"],      
  },
  prn: {
    type: Number,
    required: [true, "Please provide a PRN!"],      
  },
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
      },
      role: {
        type: String,
        required: [true, "Please provide a role!"],
      },

      
  })
  module.exports =  mongoose.model("Users", UserSchema);

  