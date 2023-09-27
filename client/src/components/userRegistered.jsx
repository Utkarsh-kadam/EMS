import React, { useState, useEffect } from "react"; 
 import axios from "axios"; 
 import Navbar from "./Navbar"; 
 import { Link } from "react-router-dom"; 
 import { ToastContainer } from "react-toastify"; 
 import "react-toastify/dist/ReactToastify.css"; 
 import FeedbackForm from "./FeedbackForm"; // Import the FeedbackForm component

  
 function EventCard({ data, onFeedbackClick }) { 
   const { _id, name,date,venue,imageUrl } = data; 

   const handleFeedbackClick = () => {
    // Call the onFeedbackClick function and pass the event data
    onFeedbackClick(data);
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
         <button className="button"  onClick={handleFeedbackClick}> Feedback</button>

       </div> 
     </li> 
   ); 
 } 
  
 function UserRegistered() {
  const [event, setEvent] = useState([]);
  const userId = localStorage.getItem("userId");
  const [selectedEvent, setSelectedEvent] = useState(null); // Define selectedEvent state

  const handleFeedbackClick = (data) => {
    console.log("Event data:", data); // Check if data is correctly passed

    // When a user clicks the "Provide Feedback" button,
    // set the selected event and show the feedback form.
    setSelectedEvent(data);
  };

  
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
             onFeedbackClick={handleFeedbackClick}/> 
           ))} 
         </ul> 
       </section> 
     </section> 

     {selectedEvent && (
        <FeedbackForm
        eventId={selectedEvent._id} // Make sure to pass the eventId prop here
        userId={userId}
        onClose={() => setSelectedEvent(null)}
      />
      )}
  
     </div> 
  
   ); 
 } 
  export default UserRegistered;