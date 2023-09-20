const express = require("express");
const router = express.Router();
const Registration = require("../db/eventRegistrationModel");
const Event = require("../db/eventModel");




exports.postRegisterEvent = async (req, res) => {
    try {
      const { userId, eventId } = req.body;
      // Check if the user is already registered for the event
      const existingRegistration = await Registration.findOne({ userId, eventId });
  
      if (existingRegistration) {
        return res.status(400).json({ message: 'User is already registered for the event' });
      }
  
      // If the user is not already registered, create a new registration entry
      const newRegistration = new Registration({ userId, eventId });
      await newRegistration.save();
      await Event.findByIdAndUpdate(eventId, { $addToSet: { registeredUsers: userId } });
  
      res.status(200).json({ message: 'User registered for the event', registration: newRegistration });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register for the event', error: error.message });
    }
  };