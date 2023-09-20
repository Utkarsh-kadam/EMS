// userRoutes.js
const express = require("express");
const router = express.Router();
const Registration = require("../db/eventRegistrationModel");
const Event = require("../db/eventModel");

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
        });
      }
    }

    res.status(200).json(registeredEvents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registered events", error });
  }
});

module.exports = router;
