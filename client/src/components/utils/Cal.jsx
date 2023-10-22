import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';




const localizer = momentLocalizer(moment);

function Cal() {
    const [events, setEvents] = useState([]);
    const isMobile = useMediaQuery({ maxWidth: 768 }); 


    useEffect(() => {
        axios
            .get("https://ems-api-63wi.onrender.com/event")
            .then((res) => {
                const sortedEvents = res.data.map(event => ({
                    ...event,
                    start: new Date(event.startDate), // Use 'start' instead of 'startDate'
                    end: new Date(event.endDate), // Use 'end' instead of 'endDate'
                    title: event.name,
                    venue: event.venue,
                }));
                setEvents(sortedEvents);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const CustomEvent = ({ event }) => (
        <div>
          <strong>{event.title}</strong>
          <p className='cal_venue'>{event.venue}</p>
        </div>
      );
      


    return (
        <div>
        <Navbar isAdmin={false}/>
        <br></br>
        <div className='feedback-analysis'>
            
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start" 
                endAccessor="end"
                defaultView={isMobile ? 'agenda' : 'month'}
                style={{ height: 550 ,width:"80vw", margin:"auto" }}
                components={{ event: CustomEvent }}
            />

        </div>
        </div>
    );
}

export default Cal;
