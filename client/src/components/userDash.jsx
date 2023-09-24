import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import Navbar from "./Navbar";


function EventCard({ data,handleEventRegister }) {
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
            <div className="button-container">
           
            <button
          className="button"
          onClick={() => handleEventRegister(_id)}>
                   <strong>Register</strong>
                </button>
            </div>
        </li>
    );

   
}

export function UserDash() {
    const [event, setEvent] = useState([]);
    const [open, setOpen] = useState(false); 
    const [id, setId] = useState(""); 
    const [update, setUpdate] = useState(false); 
    

    useEffect(
        function () {
            axios
                .get("https://ems-api-63wi.onrender.com/event")
                .then((res) => {
                    setEvent(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update] 
    );

    function handleEdit(e) {
        setId(e.target.name); 
        setOpen(true);
    }

    function handleClose() { 
        setId("");
        setOpen(false);
    }

   async function handleEventRegister(eventId) {
    const userId = localStorage.getItem("userId");
        try {
          const response = await fetch("https://ems-api-63wi.onrender.com/eventregister", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, eventId }),
          });

          if (response.status === 200) {

            notify("Registered Successfully!","success");
            setUpdate(!update);
          } else if(response.status === 400){
            notify("Already Registered!");
          }
          else {
            // Handle registration error
            notify("Registration Failed!");
            const errorText = await response.text();
            console.error("Error registering for the event:", errorText);
          }
        } catch (error) {
          console.error("Error registering for the event:", error);
        }
      
      }
      

    return (
      <div>
        <Navbar isAdmin={false}/>
        <section className="container">
      <ToastContainer />

      <section className="contents">
      <p> Welcome, {localStorage.getItem("username")} !</p>
        <h3 className="events-title large-font">Events</h3>
        <ul className="list-container">
          {event.map((data) => (
            <EventCard data={data} handleEventRegister={handleEventRegister} />
          ))}
        </ul>
      </section>
    </section>

      </div>
     
    );
}