import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventCard({ data }) {
  const { _id, name,date,venue,imageUrl } = data;
  return (
    <li key={_id} className="event-card">
      <div className="text-container">
        <div className="image-container">
          <img src={imageUrl} alt={name} className="event-image" />
        </div>
        <h3 className="event-title">{name}</h3>
        <p className="event-info"><strong>{date}</strong></p>
        <p className="event-info"><strong>Venue:</strong> {venue}</p>
      </div>
    </li>
  );
}

function UserRegistered() {
  const [event, setEvent] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`https://ems-api-63wi.onrender.com/user/${userId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log("Failed to fetch event data");
        console.log(err.message);
      });
  }, [userId]);

  return (
    <section className="container">
      <h1 className="admin-title">User Portal</h1>
      
      <Link to="/userDash" className="button-new">
                <button className="button">
                   <strong>All Events</strong> 
                    </button>
            </Link>
      <section className="contents">
      <p> Welcome, {localStorage.getItem("username")} !</p>
        <h3 className="events-title">Registered Events</h3>
        <ul className="list-container">
          {event.map((data) => (
            <EventCard key={data._id} data={data} />
          ))}
        </ul>
      </section>
    </section>
  );
}

export default UserRegistered;
