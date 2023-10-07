import React, { useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom';
import { notify } from "../utils/toast";
import { ToastContainer } from "react-toastify";


function FeedbackForm() {
  const { eventId, userId,name} = useParams();
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState({
    questions: [],
    
  });

  

  const handleQuestionChange = (index, answer) => {
    const updatedQuestions = [...feedbackData.questions];
    updatedQuestions[index] = {question: feedbackQuestions[index],answer};
    setFeedbackData({ ...feedbackData, questions: updatedQuestions });
  };



  const handleSubmitFeedback = () => {

   const response =  axios
    .post("https://ems-api-63wi.onrender.com/user/feedback", {
      userId,
        eventId,
        questions: feedbackData.questions,
      })
      .then((response) => {
       
        navigate('/userRegistered')
      })
      .catch((error) => {
        console.error("Failed to submit feedback:", error);
        notify(`Error: ${error.response.data.message}`);

      });
  };

  const feedbackQuestions = [
    "1. Contents were value-adding to your knowledge?",
    "2. Knowledge expertise of resource person?",
    "3. Duration of activity was aligned with contents?",
    "Will you recommend this activity for other student groups? Write reason for your ansers."
  ];

  return (
    <div>
        <ToastContainer/>
    <div className="feedback-form">
      
      <h3>Feedback Form</h3>
      <p>
        Event: {name}
      </p>
      <label>Rate Your Feedback on a scale of 1 to 3 (1: Low  2: Medium  3: High)</label>
      
      {feedbackQuestions.map((question, index) => (
        <div key={index} className="question-container">
          <p>{question}</p>
          {index < 3 ? (
            <select
              value={feedbackData.questions[index]?.answer || ""}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          ) : (
            <input
              type="text"
              value={feedbackData.questions[index]?.answer || ""}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmitFeedback}>Submit Feedback</button>
    </div>
    </div>
  );
}

export default FeedbackForm;
