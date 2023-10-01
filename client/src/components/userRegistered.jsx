import React, { useState, useEffect } from "react"; 
 import axios from "axios"; 
 import Navbar from "./Navbar"; 
 import { Link,useNavigate } from "react-router-dom"; 
 import { ToastContainer } from "react-toastify"; 
 import "react-toastify/dist/ReactToastify.css"; 

  
 function EventCard({ data }) { 
   const { _id, name,date,venue,imageUrl } = data; 
   const navigate = useNavigate();
   const userId = localStorage.getItem("userId");

   const handleFeedbackClick = () => {
     // Redirect to the Feedback page with eventId and userId as URL parameters
    navigate(`/feedback/${_id}/${userId}/${name}`);
  };

  const handleAttendanceClick = () => {
    // Redirect to the Attendance page with eventId and userId as URL parameters
      navigate(`/attendance/${_id}/${userId}/${name}`);
  };


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
       <button className="button"  onClick={handleFeedbackClick}> Feedback</button>
         <button className="button"  onClick={handleAttendanceClick}> Attendance </button>
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
     <div> 
       <Navbar isAdmin={false} /> 
       <section className="container"> 
       <section className="contents"> 
  
         <h3 className="events-title">Registered Events</h3> 
         <ul className="list-container"> 
           {event.map((data) => ( 
             <EventCard key={data._id} data={data} 
             /> 
           ))} 
         </ul> 
       </section> 
     </section> 

     
     </div> 
  
   ); 
 } 
  export default UserRegistered;