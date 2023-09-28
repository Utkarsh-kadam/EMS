import React, { useState } from "react";
import axios from "axios";

function FeedbackForm({ eventId, userId, onClose }) {
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    comment: "",
    questions: [],
  });

  const handleRatingChange = (e) => {
    setFeedbackData({ ...feedbackData, rating: e.target.value });
  };

  const handleCommentChange = (e) => {
    setFeedbackData({ ...feedbackData, comment: e.target.value });
  };

  const handleQuestionChange = (index, answer) => {
    const updatedQuestions = [...feedbackData.questions];
    updatedQuestions[index] = { question: feedbackQuestions[index], answer };
    setFeedbackData({ ...feedbackData, questions: updatedQuestions });
  };

  const handleSubmitFeedback = () => {
    console.log("Submitting feedback data:", {
      userId,
      eventId,
      rating: feedbackData.rating,
      comment: feedbackData.comment,
      questions: feedbackData.questions,
    });

    axios
      .post("https://ems-api-63wi.onrender.com/user/feedback", {
        userId,
        eventId,
        rating: feedbackData.rating,
        comment: feedbackData.comment,
        questions: feedbackData.questions,
      })
      .then((response) => {
        console.log("Feedback submitted successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Failed to submit feedback:", error);
      });
  };

  const feedbackQuestions = [
    "What was the most valuable aspect of the event for you?",
    "Do you have any suggestions or recommendations for improving future events like this?",
  ];

  return (
    <div className="feedback-form">
      <h3>Provide Feedback</h3>
      <label>Rating:</label>
      <select value={feedbackData.rating} onChange={handleRatingChange}>
        <option value="1">1 (Poor)</option>
        <option value="2">2 (Fair)</option>
        <option value="3">3 (Average)</option>
        <option value="4">4 (Good)</option>
        <option value="5">5 (Excellent)</option>
      </select>
      <label>Comment:</label>
      <textarea
        value={feedbackData.comment}
        onChange={handleCommentChange}
        rows="4"
        cols="50"
      ></textarea>
      {feedbackQuestions.map((question, index) => (
        <div key={index} className="question-container">
          <p>{question}</p>
          <input
            type="text"
            value={feedbackData.questions[index]?.answer || ""}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          />
</div>
      ))}

      <button onClick={handleSubmitFeedback}>Submit Feedback</button>
    </div>
  );
}

export default FeedbackForm;
