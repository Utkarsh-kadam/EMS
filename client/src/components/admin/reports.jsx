import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../utils/Navbar';
import { MdGroups } from "react-icons/md";
import {Md3P} from "react-icons/md"
import {AiFillNotification} from "react-icons/ai"
import {BsFileEarmarkPersonFill} from "react-icons/bs"
import { Link,Route } from 'react-router-dom'; 


function Reports() {
  const [events, setEvent] = useState([]);


  useEffect(() => {
    // Fetch event data from your API endpoint
    axios
      .get('https://ems-api-63wi.onrender.com/event')
      .then((res) => {
        const sortedEvents = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setEvent(sortedEvents);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  return (
    <div>
      <Navbar isAdmin={true} />
            <section className="container">
            <section className="contents">

              <h3>Events Reports</h3>
              <br/>
         
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>Event</th>
                  <th>60</th>
                  <th>61</th>
                  <th>62B</th>
                  <th>63</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event,index) => (
                  <tr key={event._id}>
                    <td>{index + 1}</td>
                    <td><strong>{event.name}</strong></td>

                    <td>
                    <Link
                        to={`/rpp/${event._id}`} >
                      <button
                        className="button-table">
                            < BsFileEarmarkPersonFill className='table-icon'  />
                      </button>
                      </Link>
                    </td>

                    <td>
                    <Link
                        to={`/notice/${event._id}/${event.name}/${event.startDate}/${event.venue}`} >
                      <button
                        className="button-table">
                            < AiFillNotification className='table-icon'  />
                      </button>
                      </Link>
                    </td>

                    <td>
                    <Link
                        to={`/feedback-analysis/${event._id}/${event.name}/${event.startDate}`} >
                      <button className="button-table">
                        <Md3P className='table-icon' />
                        </button>
                        </Link>
                    </td>

                    <td>
                    <Link
                        to={`/attendance-report/${event._id}/${event.name}/${event.startDate}`} >
                      <button
                        className="button-table">
                            < MdGroups className='table-icon'  />
                      </button>
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            </section>
      </section>
          
        
    </div>
  );
}

export default Reports;
