import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {  Application,DateTimePicker } from "react-rainbow-components";


export function CreateEvent() {
    const [data, setData] = useState({ name: "", description: "" ,organizer :"", startDate: "",
    endDate: "",venue:"",imageUrl: ""});
    const navigate =useNavigate();
    const theme = {
        rainbow: {
            palette: {
                brand: '#dea114',
                mainBackground:'#00000',
                text:"#fff",
                border:'#dea114'
            },
            
        },
    };
  

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formattedStartDate = data.startDate.toISOString();
        const formattedEndDate = data.endDate.toISOString();


        const event = {
            name: data.name,
            description: data.description,
            organizer :data.organizer,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            venue : data.venue,
            imageUrl: data.imageUrl
        };

        console.log({ event });
        axios

            .post("https://ems-api-63wi.onrender.com/event", event)

            .then((res) => {
                setData({ name: "", description: "" ,organizer :"",  startDate: "",
                endDate: "",venue:"" ,imageUrl: ""});
                navigate('/event');
            })
            .catch((err) => {
                console.log("Error couldn't create event");
                console.log(err.message);
                console.log(data.startDate);
                console.log(formattedStartDate);
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
                            <label className="label" htmlFor="startDate">
                            Start Date
                            </label>
                        
                            <DateTimePicker
                                    id="datePicker-1"
                                    value={data.startDate}
                                    onChange={(date) =>setData((data) => ({ ...data, startDate: date }))}
                                    className="input"
                                    />
                         
            
                    </div>

                <div className="form-group">
                    <label className="label" htmlFor="endDate">
                    End Date
                    </label>
                   
                                 <DateTimePicker
                                    id="datePicker-1"
                                    value={data.endDate}
                                    onChange={(date) =>setData((data) => ({ ...data, endDate: date }))}
                                    formatStyle="large"
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
                    <div className="form-group">
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
                    </div>
                    <button type="submit" className="button">
                        Create Event
                    </button>
                </form>
            </section>
        </section>
    );
}