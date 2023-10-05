import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function MarkAttendance() {
    const { eventId, userId,name } = useParams();
  const [attendancePassword, setAttendancePassword] = useState('');
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(false);

  const handlePasswordChange = (e) => {
    setAttendancePassword(e.target.value);
  };

  const handleMarkAttendance = () => {

    axios
      .post('https://ems-api-63wi.onrender.com/user/attendance', {
        userId,
        eventId,
        attendancePassword
      })
      .then((response) => {
        console.log('Attendance submitted successfully:', response.data);
        setAttendanceSubmitted(true);
        setMessage(response.data.message);
        setError(false);

      })
      .catch((error) => {
        console.error('Failed to submit Attendance:', error);
        setAttendanceSubmitted(true);
        setMessage(error.response.data.message); // Set the error message
        setError(true);
      });
  };

  return (
    <div className='container'>
    <div className="mark-attendance">

      <h3>Mark Attendance for {name}</h3>
      {!attendanceSubmitted && (
        <>
          <label>Attendance Password:</label>

          <input
          className='input-p'
            value={attendancePassword}
            onChange={handlePasswordChange}
          />

          <button className='button' onClick={handleMarkAttendance}>Submit Attendance</button>
        </>
      )}
      {attendanceSubmitted && (
        <div>
          {error ? (
            <p className="error-message">{message}</p>
          ) : (
            <p className="success-message">{message}</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
}

export default MarkAttendance;
