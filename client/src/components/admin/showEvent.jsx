import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateEvent } from "./updateEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../utils/toast";
import Navbar from "../utils/Navbar";


function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return date.toLocaleDateString(undefined, options);
  }

function EventCard({ data,handleEdit, handleDelete }) {
    const { _id, name,startDate,venue,imageUrl,registeredUsers } = data;
    return (
        <li key={_id} className="event-card">
        <div className="text-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} className="event-image" />
            </div>
           
                <h3 className="event-title">{name}</h3>
                {/* <p className="event-description">{description}</p> */}
                <p className="event-info"><strong>{formatDate(startDate)}</strong></p>
                <p className="event-info"><strong>Venue:</strong> {venue}</p>
                <p className="event-info"><strong>Count:</strong> {registeredUsers.length}</p>
            </div>
            <div className="button-container">
            <button className="button" data-id={_id} onClick={handleEdit}> 
                    <strong>Edit</strong> 
                </button>
                <button className="button" data-id={_id} onClick={handleDelete}>
                   <strong>Delete</strong>
                </button>
            </div>
        </li>
    );
}

export function ShowEventList() {
    const [event, setEvent] = useState([]);
    const [open, setOpen] = useState(false); 
    const [id, setId] = useState(""); 
    const [update, setUpdate] = useState(false); 

    useEffect(
        function () {
            axios
                .get("https://ems-api-63wi.onrender.com/event")
                .then((res) => {
                    const sortedEvents = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                    setEvent(sortedEvents);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update] 
    );

    function handleEdit(e) {
        setId(e.currentTarget.getAttribute("data-id")); 
        console.log(e.target.name);
        setOpen(true);
    }

    function handleUpdate() { 
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) { 
        axios.delete(`https://ems-api-63wi.onrender.com/event/${e.currentTarget.getAttribute("data-id")}`)
        .then(() => {
           notify("Event Deleted !","success")
            setEvent((data) => {
                return data.filter((event) => event._id !== e.target.name);
            });
        })
        .catch((err) => {
            notify("Failed to delete event");
            console.log(err.message);
        });
    
    }

    function handleClose() { 
        setId("");
        setOpen(false);
    }

    return (
        <div>
            <Navbar isAdmin={true}/>

        <section className="container">
          
        
            <section className="contents">
            <p> Welcome, Admin !</p>
                <h3 className="events-title">All Events</h3>
                <ul className="list-container">
                    {event.map((data) => (
                        <EventCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            
           
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateEvent
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                null
            )}
        </section>
        <ToastContainer/>
        </div>
       
    );
}