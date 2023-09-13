import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function CreateEvent() {
    const [data, setData] = useState({ name: "", description: "" ,organizer :"", date:"", time:"",venue:"",imageUrl: ""});

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const event = {
            name: data.name,
            description: data.description,
            organizer :data.organizer,
            date : data.date,
            time : data.time,
            venue : data.venue,
        };

        console.log({ event });
        axios
            .post("http://localhost:3000/event", data)
            .then((res) => {
                setData({ name: "", description: "" ,organizer :"", date:"", time:"",venue:"" ,imageUrl: ""});
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error couldn't create event");
                console.log(err.message);
            });
    }

    return (
        <section className="container">
            <Link to="/event" className="button-back">
                <button type="button" className="button">
                    Back
                </button>
            </Link>
            <section className="contents">
                <form onSubmit={handleSubmit} className="form-container" noValidate>
                <div className="form-group">
                    <label className="label" htmlFor="name">
                        Event Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label className="label" htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                    </div>

                 <div className="form-group">
                    <label className="label" htmlFor="imageUrl">
                        Image Link
                    </label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={data.imageUrl}
                        onChange={handleChange}
                        className="input"
                    />
                    </div>
                <div className="form-group">
                    <label className="label" htmlFor="organizer">
                     Organizer
                    </label>
                    <input
                        type="text"
                        name="organizer"
                        value={data.organizer}
                        onChange={handleChange}
                        className="input"
                    />
                    </div>

                    <div className="form-group">
                    <label className="label" htmlFor="date">
                    Date
                    </label>
                    <input
                        type="text"
                        name="date"
                        value={data.date}
                        onChange={handleChange}
                        className="input"
                    />
                    </div>

                    <div className="form-group">
                    <label className="label" htmlFor="time">
                    Time
                    </label>
                    <input
                        type="text"
                        name="time"
                        value={data.time}
                        onChange={handleChange}
                        className="input"
                    />
                    </div>
                    <div className="form-group">
                    <label className="label" htmlFor="venue">
                    Venue
                    </label>
                    <input
                        type="text"
                        name="venue"
                        value={data.venue}
                        onChange={handleChange}
                        className="input"
                    />
                    </div>
                    
                    <button type="submit" className="button">
                        Create Event
                    </button>
                </form>
            </section>
        </section>
    );
}