import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function UpdateEvent({ _id, handleClose, handleUpdate }) {
    const [data, setData] = useState({ name: "", description: "" ,organizer :"", date:"", time:"",venue:"" ,imageUrl: ""});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://ems-api-63wi.onrender.com/event/${_id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log("Failed to fetch event data");
                console.log(err.message);
            });
    }, [_id]);

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`https://ems-api-63wi.onrender.com/event/${_id}`, data)
            .then((res) => {
                setData({name: "", description: "" ,organizer :"", date:"", time:"",venue:"",imageUrl: "" });
                navigate('/event');
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
    }

    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleUpdate();
                handleClose();
            }}
        >
        
            <label htmlFor="name" className="label">
                Name
            </label>
            <input
                type="text"
                name="name"
                className="input"
                onChange={handleChange}
                value={data.name}
            />
            <label htmlFor="description" className="label">
                Description
            </label>
            <input
                type="text"
                name="description"
                className="input"
                onChange={handleChange}
                value={data.description}
            />

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

            <label className="label" htmlFor="organizer">
                     Organizer
                    </label>
                    <input
                        type="text"
                        name="organizer"
                        onChange={handleChange}
                        className="input"
                        value={data.organizer}
                    />

                    <label className="label" htmlFor="date">
                    Date
                    </label>
                    <input
                        type="text"
                        name="date"
                        onChange={handleChange}
                        className="input"
                        value={data.date}
                    />

                    <label className="label" htmlFor="time">
                    Time
                    </label>
                    <input
                        type="text"
                        name="time"
                        onChange={handleChange}
                        className="input"
                        value={data.time}
                    />

                    <label className="label" htmlFor="venue">
                    Venue
                    </label>
                    <input
                        type="text"
                        name="venue"
                        onChange={handleChange}
                        className="input"
                        value={data.venue}
                    />

                    <label className="label" htmlFor="eventpassword">
                    Event Password
                    </label>
                    <input
                        type="text"
                        name="eventpassword"
                        onChange={handleChange}
                        className="input"
                        value={data.eventpassword}
                    />
            <button type="submit" className="button">
                Update
            </button>
        </form>
    );
}