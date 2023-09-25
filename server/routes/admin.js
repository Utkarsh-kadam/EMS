const express = require("express");
const router = express.Router();
const Attendance = require("../db/attendanceModel"); // Assuming you have an Attendance model
const User = require("../db/userModel"); // Assuming you have a Users model

// Endpoint to get attendance data by eventId
router.get("/:eventId", async (req, res) => {
  const eventId = req.params.eventId;

  try {
    // Find all attendance records for the given eventId
    const attendanceRecords = await Attendance.find({ eventId }, { userId: 1 });

    // Extract userIds from attendance records
    const userIds = attendanceRecords.map((record) => record.userId);

    // Fetch user details for the retrieved userIds
    const userRecords = await User.find(
      { _id: { $in: userIds } },
      { username: 1, prn: 1, college: 1 }
    );

    res.status(200).json(userRecords);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user details", error });
  }
});

module.exports = router;

