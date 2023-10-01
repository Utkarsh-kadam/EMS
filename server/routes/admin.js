const express = require("express");
const router = express.Router();
const Attendance = require("../db/attendanceModel"); // Assuming you have an Attendance model
const User = require("../db/userModel"); // Assuming you have a Users model
const Feedback = require("../db/feedbackModel");

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


// Endpoint to analyze feedback for a specific event
router.get("/feedback/:eventId", async (req, res) => {
  const eventId = req.params.eventId;

  try {
    // Find all feedback records for the given eventId
    const feedbackRecords = await Feedback.find({ eventId });

    // Initialize an object to store analysis for each question
    const questionAnalysis = {};

    // Analyze the feedback for each question
    feedbackRecords.forEach((record) => {
      record.questions.slice(0, 3).forEach((questionObj) => {
        const question = questionObj.question;
        const answer = questionObj.answer;

        // Initialize analysis data for the question if not exists
        if (!questionAnalysis[question]) {
          questionAnalysis[question] = {
            totalScore: 0, // Initialize total score
          };
        }

        // Calculate the total score for each question
        questionAnalysis[question].totalScore += parseInt(answer);

       
    
      });
    });

    // Calculate the average score for each question
    Object.keys(questionAnalysis).forEach((question) => {
      const totalScore = questionAnalysis[question].totalScore;
      questionAnalysis[question].averageScore = Math.round(totalScore / 3);
    });

    res.status(200).json({ questionAnalysis });
  } catch (error) {
    res.status(500).json({ message: "Failed to analyze feedback", error });
  }
});


module.exports = router;

