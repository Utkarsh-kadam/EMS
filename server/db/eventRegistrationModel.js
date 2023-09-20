const mongoose = require('mongoose');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');


const registrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who registered
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Reference to the event being registered for
    registrationDate: { type: String, formatted }, // Date of registration
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
