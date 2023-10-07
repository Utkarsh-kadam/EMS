// userRoutes.js
const express = require("express");
const router = express.Router();
const Registration = require("../db/eventRegistrationModel");
const Event = require("../db/eventModel");
const Attendance =  require("../db/attendanceModel");
const Feedback = require("../db/feedbackModel");


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
  const { userId, eventId ,attendancePassword} = req.body;
  
  try {
    // Check if the user is already registered for the event
    const existingRegistration = await Registration.findOne({ userId, eventId });

    if (!existingRegistration) {
      return res.status(400).json({ message: "User is not registered for the event" });
    }

    // Check if the user has given feedback for the event
    const feedbackCheck = await Feedback.findOne({ userId, eventId });
    if (!feedbackCheck) {
      return res.status(405).json({ message: "Feedback not submitted for the event" });
    }

    // Check if attendance already exists
    const existingAttendance = await Attendance.findOne({ userId, eventId });

    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already recorded for this event" });
    }

    const response = await fetch(`https://ems-api-63wi.onrender.com/event/${eventId}`);
    const data = await response.json();

    if (data.eventpassword !== attendancePassword) {
      return res.status(401).json({ message: "Attendance password is incorrect" });
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


// Endpoint to submit feedback for an event
router.post("/feedback", async (req, res) => {
  const { userId, eventId, questions } = req.body;
  console.log(req.body); 

  try {
    // Check if a feedback entry already exists for the user and event
    const existingFeedback = await Feedback.findOne({ userId, eventId });

    if (existingFeedback) {
      return res.status(400).json({ message: "Feedback already submitted for this event" });

    }
    // Create a new feedback object
    const feedback = new Feedback({
      userId,
      eventId,
      questions,
    
    });

    // Save the feedback to the database
    await feedback.save();

    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Failed to submit feedback", error });
  }
});


module.exports = router;
