import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../utils/Navbar';
import { VscFeedback } from "react-icons/vsc";
import { MdGroups } from "react-icons/md";
import { Link,Route } from 'react-router-dom'; 
import Header from '../utils/MGMheader';
import Footer from '../utils/MGMfooter';


function Reports() {
  const [events, setEvent] = useState([]);
  const [users, setUser] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [eventName, setEventName] = useState('');


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

  

  const handleBackClick = () => {
    setShowAttendance(false); // Set showAttendance to false to go back to event list state
  };

  return (
    <div>
      <Navbar isAdmin={true} />
    
          {showAttendance ? (
            // Render attendance table
            <section className="container">
            <section className="contents">
            <Header/>
            <h4>Attendace for {eventName}</h4>
            <table>
              <thead>
                <tr>
                  <th>Sr </th>
                  <th>PRN</th>
                  <th>Name </th>
                  <th>College</th>
                </tr>
              </thead>
              <tbody>
              {users.map((users,index) => (
                  <tr key={users._id}>
                    <td>{index + 1}</td>
                    <td>{users.prn}</td>
                    <td>{users.username}</td>
                    <td>
                    {users.college}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h5>Total Students : {users.length}</h5>
            <br/>

            </section>
             </section>
                
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
                        to={`/feedback-analysis/${event._id}/${event.name}/${event.startDate}`} >
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
