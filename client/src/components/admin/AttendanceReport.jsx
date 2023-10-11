// AttendanceReport.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../utils/MGMheader';

function AttendanceReport() {
  const {eventId,eventName,eventDate} = useParams();
  const [users, setUser] = useState([]);
  const [isOptionMenuVisible, setIsOptionMenuVisible] = useState(true);

  useEffect(() => {
    // Fetch attendance data for the given event from your API endpoint
    axios
      .get(`https://ems-api-63wi.onrender.com/admin/${eventId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [eventId]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();;
  };

  const handleDoneClick = () => {
   
 // Set isOptionMenuVisible to false
    setIsOptionMenuVisible(false);
  
    // Trigger the print dialog after a brief delay (to allow hiding to take effect)
    setTimeout(() => {
      window.print();
    }, 100); // You can adjust the delay as needed
   
  };

  return (
    <div className="feedback-analysis">
        <Header/>
        
        <h5>Event Name: {eventName}</h5>
      <h5>Date & Time: {formatDate(eventDate)} </h5>
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Sr </th>
              <th>PRN</th>
              <th>Name </th>
              <th>College</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.prn}</td>
                <td>{user.username}</td>
                <td>{user.college}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5>Total Students : {users.length}</h5>
        <br />
        {isOptionMenuVisible && (
            <button className="button" onClick={handleDoneClick}>
            Download PDF
           </button>
        )}
        </div>
  );
}

export default AttendanceReport;
