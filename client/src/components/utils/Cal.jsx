import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';



Modal.setAppElement("#root");
const customModalStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Background color behind the modal
      },
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        zIndex: 999999,
        marginRight: '-50%',
        backgroundColor: "rgba(222, 233, 233,1)",
        color:'#000000',
        transform: 'translate(-50%, -50%)',
        
    },
};



const localizer = momentLocalizer(moment);

function Cal() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
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
                }));
                setEvents(sortedEvents);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(""); // Close the modal by resetting the selected event state
    };


    return (
        <div>
        <Navbar isAdmin={true}/>
        <br></br>
        <div className='feedback-analysis'>
            
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start" 
                endAccessor="end"
                defaultView={isMobile ? 'agenda' : 'month'}
                style={{ height: 550 ,width:"80vw", margin:"auto" }}
                selectable
                onSelectEvent={handleSelectEvent}
            />

                <Modal
                isOpen={!!selectedEvent}
                onRequestClose={closeModal}
                style={customModalStyles}
            >
                {selectedEvent && (
                    <div>
                        
                        <p>Event Name: {selectedEvent.name}</p>
                        <p>Venue: {selectedEvent.venue} </p>

                        <br/>
                        <button className='button' onClick={closeModal}>Close</button>
                    
                       
                    </div>
                )}
            </Modal>
        </div>
        </div>
    );
}

export default Cal;
