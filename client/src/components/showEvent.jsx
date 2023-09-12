import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateEvent } from "./updateEvent";


function EventCard({ data,handleEdit, handleDelete }) {
    const { _id, name, description,date,venue,imageUrl } = data;
    return (
        <li key={_id}>

            <div className="image-container">
                <img src={imageUrl} alt={name} className="event-image" />
            </div>
            <div className="title-description">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>Date : {date}</p>
                <p>Venue : {venue}</p>
            </div>

            <div className="button-container">
            <button className="button" name={_id} onClick={handleEdit}> 
                    edit
                </button>
                <button className="button" name={_id} onClick={handleDelete}>
                    delete
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
                .get("http://localhost:3000/event")
                .then((res) => {
                    console.log(res.data);
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

    function handleUpdate() { 
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) { 
        axios.delete(`http://localhost:3000/event${e.target.name}`);
    

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
            <h1>Admin Portel</h1>
            <Link to="/create-event" className="button-new">
                <button className="button">New</button>
            </Link>
            <section className="contents">
                <h1>Events</h1>
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
                ""
            )}
        </section>
    );
}