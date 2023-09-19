import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


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
           
                <button className="button" name={_id} >
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

    return (
        <section className="container">
            <h1 className="admin-title">User Portal</h1>
        
            <section className="contents">
                <h3 className="events-title large-font">Events</h3>
                <ul className="list-container">
                    {event.map((data) => (
                        <EventCard
                            data={data}
                            handleEdit={handleEdit}
                        />
                    ))}
                </ul>
            </section>
        
        </section>
    );
}