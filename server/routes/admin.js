const express = require("express");
const router = express.Router();
const Attendance = require("../db/attendanceModel"); 
const User = require("../db/userModel"); 
const Feedback = require("../db/feedbackModel");
const Notice = require("../db/noticeModel");
const RPP = require("../db/rppModel");
const FeedbackAnalysis = require("../db/feedbackAnalysisModel");



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

// Endpoint for Notice

router.post("/notice", async (req, res) => {
  try {
    const { eventId, nameofRpp, partAud } = req.body;

    // Create a new "Notice" document
    const notice = new Notice({
      eventId,
      nameofRpp,
      partAud,
    });

    // Save the notice document to the database
    await notice.save();

    res.status(201).json({ message: "Notice saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to save notice", error });
  }
});

// Endpoint to get notice data by event ID
router.get("/notice/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Find the notice document for the given event ID
    const notice = await Notice.findOne({ eventId });

    if (notice) {
      // If a notice document is found, return it in the response
      res.status(200).json(notice);
    } else {
      // If no notice document is found, return an empty object or a suitable message
      res.status(404).json({});
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch notice data", error });
  }
});


// Endpoint to save RPP data
router.post("/rpp", async (req, res) => {
  try {
    const { eventId, name, contactNo, designation, institute, workingExperience, areaOfExpertise, achievements, content } = req.body;

    // Create a new "RPP" document
    const rpp = new RPP({
      eventId,
      name,
      contactNo,
      designation,
      institute,
      workingExperience,
      areaOfExpertise,
      achievements,
      content,
    });

    // Save the RPP document to the database
    await rpp.save();

    res.status(201).json({ message: "RPP saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to save RPP", error });
  }
});

// Endpoint to get RPP data by event ID
router.get("/rpp/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Find the RPP document for the given event ID
    const rpp = await RPP.findOne({ eventId });

    if (rpp) {
      // If an RPP document is found, return it in the response
      res.status(200).json(rpp);
    } else {
      // If no RPP document is found, return an empty object or a suitable message
      res.status(404).json({});
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch RPP data", error });
  }
});


// Endpoint to save PO and PSO data
router.post("/feedbackanalysis", async (req, res) => {
  const { eventId, poMatrix, psoMatrix } = req.body;

  try {
    const feedbackAnalysis = await FeedbackAnalysis.findOneAndUpdate(
      { eventId },
      { poMatrix, psoMatrix },
      { upsert: true, new: true }
    );
    

  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
});

// Endpoint to retrieve PO and PSO data
router.get("/feedbackanalysis/:eventId", async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const feedbackAnalysis = await FeedbackAnalysis.findOne({ eventId });
    res.json(feedbackAnalysis);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data");
  }
});


module.exports = router;

