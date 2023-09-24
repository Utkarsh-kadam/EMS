const mongoose = require('mongoose');


const attendanceSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events', 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
