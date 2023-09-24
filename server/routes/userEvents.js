// userRoutes.js
const express = require("express");
const router = express.Router();
const Registration = require("../db/eventRegistrationModel");
const Event = require("../db/eventModel");
const Attendance =  require("../db/attendanceModal");

// Endpoint to get registered events for a user
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all registrations for the user
    const userRegistrations = await Registration.find({ userId });

    // Create an array to store registered event details
    const registeredEvents = [];

    // Fetch event details for each registered event
    for (const registration of userRegistrations) {
      const eventId = registration.eventId;

      // Find the event details using eventId
      const eventDetails = await Event.findById(eventId);

      if (eventDetails) {
        registeredEvents.push({
          _id: eventDetails._id,
          name: eventDetails.name,
          date: eventDetails.date,
          venue: eventDetails.venue,
          imageUrl: eventDetails.imageUrl
        });
      }
    }

    res.status(200).json(registeredEvents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registered events", error });
  }
});

// Endpoint to mark attendance for a user
router.post("/attendance", async (req, res) => {
  const { userId, eventId } = req.body;
  console.log(userId,eventId);

  try {
    // Check if the user is already registered for the event
    const existingRegistration = await Registration.findOne({ userId, eventId });

    if (!existingRegistration) {
      return res.status(400).json({ message: "User is not registered for the event" });
    }

    // Check if attendance already exists
    const existingAttendance = await Attendance.findOne({ userId, eventId });

    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already recorded for this event" });
    }

    // Create a new attendance record
    const attendance = new Attendance({ userId, eventId });

    await attendance.save();

    res.status(201).json({ message: "Attendance recorded successfully" });
  } catch (error) {
    console.error("Error recording attendance:", error); 
    res.status(500).json({ message: "Failed to record attendance", error });
  }
});

module.exports = router;
