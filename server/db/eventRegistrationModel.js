const mongoose = require('mongoose');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');


const registrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Events', required: true }, 
    registrationDate: { type: String, formatted }, // Date of registration
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
