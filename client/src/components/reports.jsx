import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { VscFeedback } from "react-icons/vsc";
import { MdGroups } from "react-icons/md";
import FeedbackAnalysis from './FeedbackAnalysis'; 
import { Link,Route } from 'react-router-dom'; 


function Reports() {
  const [events, setEvent] = useState([]);
  const [users, setUser] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [eventName, setEventName] = useState(''); 
  const [feedback, setFeedback] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null); // Add selectedEventId state


  useEffect(() => {
    // Fetch event data from your API endpoint
    axios
      .get('https://ems-api-63wi.onrender.com/event')
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleAttendanceClick = (eventId, eventName) => {
    setEventName(eventName); 
    setShowAttendance(true);

    axios
    .get(`https://ems-api-63wi.onrender.com/admin/${eventId}`)
    .then((res) => {
        
      setUser(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });



  };

  const handleFeedbackClick = (eventId, eventName) => {
    setEventName(eventName);
    setShowFeedback(true);
    setSelectedEventId(eventId);

    axios
      .get(`https://ems-api-63wi.onrender.com/admin/feedback/${eventId}`)
      .then((res) => {
        setFeedback(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleBackClick = () => {
    setShowAttendance(false); // Set showAttendance to false to go back to event list state
    setShowFeedback(false);
    setSelectedEventId(null);
  };

  return (
    <div>
      <Navbar isAdmin={true} />
    
          {showAttendance ? (
            // Render attendance table
            <section className="container">
            <section className="contents">
            <button className="button" onClick={handleBackClick}>
                Back 
              </button>
            <h3>Attendace for {eventName}</h3>
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>Name</th>
                  <th>PRN</th>
                  <th>College</th>
                </tr>
              </thead>
              <tbody>
              {users.map((users,index) => (
                  <tr key={users._id}>
                    <td>{index + 1}</td>
                    <td>{users.username}</td>
                    <td>{users.prn}</td>
                    <td>
                    {users.college}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            </section>
      </section>
                
            ) : showFeedback ? (
              // Render feedback analysis
              <Route
                path={`/feedback-analysis/${selectedEventId}`} // Define the route path
                render={() => <FeedbackAnalysis eventId={selectedEventId} />} // Render the FeedbackAnalysis component
              />
            ):(
            <section className="container">
            <section className="contents">

              <h3>Events Reports</h3>
         
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>Name</th>
                 
                  <th> </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event,index) => (
                  <tr key={event._id}>
                    <td>{index + 1}</td>
                    <td>{event.name}</td>
                    
                    <td>
                      <button
                        className="button-table"
                        onClick={() => handleAttendanceClick(event._id, event.name)}>
                          
                            < MdGroups className='table-icon'  />
                      </button>
                    </td>
                    <td>
                    <Link
                        to={`/feedback-analysis/${event._id}`} >
                      <button className="button-table">
                        <VscFeedback className='table-icon' />
                        </button>
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </section>
      </section>
          
           
          )}
        
    </div>
  );
}

export default Reports;
