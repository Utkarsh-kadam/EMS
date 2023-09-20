import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateEvent } from "./updateEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";


function EventCard({ data,handleEdit, handleDelete }) {
    const { _id, name,date,venue,imageUrl,registeredUsers } = data;
    return (
        <li key={_id} className="event-card">
        <div className="text-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} className="event-image" />
            </div>
           
                <h3 className="event-title">{name}</h3>
                {/* <p className="event-description">{description}</p> */}
                <p className="event-info"><strong>{date}</strong></p>
                <p className="event-info"><strong>Venue:</strong> {venue}</p>
                <p className="event-info"><strong>Count:</strong> {registeredUsers.length}</p>
            </div>
            <div className="button-container">
            <button className="button" name={_id} onClick={handleEdit}> 
                    <strong>Edit</strong> 
                </button>
                <button className="button" name={_id} onClick={handleDelete}>
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
        console.log(e.target.name);
        setOpen(true);
    }

    function handleUpdate() { 
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) { 
        console.log(e.target.name)
        axios.delete(`https://ems-api-63wi.onrender.com/event/${e.target.name}`);
    
        setEvent((data) => {
            return data.filter((event) => event._id !== e.target.name);
        });
    }

    function handleClose() { 
        setId("");
        setOpen(false);
    }

    return (
        <section className="container">
            <h1 className="admin-title">Admin Portal</h1>
            <Link to="/create-event" className="button-new">
                <button className="button">
                   <strong>New</strong> 
                    </button>
            </Link>
            <section className="contents">
                <h3 className="events-title large-font">Events</h3>
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
    );
}