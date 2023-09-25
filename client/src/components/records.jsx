
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';


function Records() {
  const [events, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch event data from your API endpoint
    axios
    .get("https://ems-api-63wi.onrender.com/event")
    .then((res) => {
        setEvent(res.data);
        setLoading(false);
    })
    .catch((err) => {
        console.log(err.message);
    });
  }, []);

  return (
    <div>
          <Navbar isAdmin={true}/>
        <section className='container'>
        <section className='contents'>
        <h3 className="events-title">Event Reports</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Attendance Reports</th>
              <th>Feedback Reports</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>
                  <button className='button' >Attendance</button>
                </td>
                <td>
                  <button className='button' >Feedback</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>
        </section>
      
    </div>
  );
}

export default Records;
