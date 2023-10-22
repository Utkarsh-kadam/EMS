import React, { useState,useEffect } from "react";
import Footer from "../utils/MGMfooter";
import Header from "../utils/MGMheader";
import { useParams } from 'react-router-dom';
import axios from "axios";



const Notice = () => {
  const [formData, setFormData] = useState({
    nameofRpp: "",
    partAud: "",
  });

  const {eventId,eventName,eventDate,venue} = useParams();

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [isOptionMenuVisible, setIsOptionMenuVisible] = useState(true); // State to control option menu visibility

  const handleDoneClick = () => {
    // Hide the delete buttons and option menu
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.style.display = "none";
    });
    setIsOptionMenuVisible(false);
  
    // Prepare the notice data to be sent to the server
    const noticeData = {
      eventId,
      nameofRpp: formData.nameofRpp,
      partAud: formData.partAud,
    };
  
    // Send a POST request to save the notice data
    axios
      .post("https://ems-api-63wi.onrender.com/admin/notice", noticeData)
      .then((response) => {
        console.log("Notice data saved successfully:", response.data);
        // Trigger the print dialog after a brief delay (to allow hiding to take effect)
        setTimeout(() => {
          window.print();
          console.log("Print dialog opened");
        }, 100);
      })
      .catch((error) => {
        console.error("Failed to save notice data:", error);
      });
  };
  

  useEffect(() => {
    axios.get(`https://ems-api-63wi.onrender.com/admin/notice/${eventId}`)
      .then((response) => {
        const savedNoticeData = response.data;
        // Update the form fields with the retrieved data
        setFormData({
          nameofRpp: savedNoticeData.nameofRpp,
          partAud: savedNoticeData.partAud,
        });
      })
      .catch((error) => {
        // Handle errors
      });
  }, [eventId]);
  

  
  return (
    <div className="feedback-analysis">
      <Header />
                
      <h4 className='feedback-heading'>Notice</h4>
      <br/>


      <label className="rpplabel" >All the students are hereby informed that the following activity has been arranged.</label>
      <label className="rpplabel" >Details are:</label>
      <label className="rpplabel" >Name of Activity: {eventName}</label> 
      <label className="rpplabel" >Date and Timing: {formatDate(eventDate)}</label>
      <label className="rpplabel" >Venue: {venue}</label>

      


      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name" className="rpplabel">Name of Resource Person:</label>
          <input
            className="rppinput"
            type="text"
            name="nameofRpp"
            value={formData.nameofRpp}
            onChange={handleChange}
          />
        </div>
      
        <div>
          <label className="rpplabel">Participating Audience:</label>
          <input
            className="rppinput"
            type="text"
            name="partAud"
            value={formData.partAud}
            onChange={handleChange}
          />
        </div>
        <br/>
        <br/>
        <Footer/>
        {isOptionMenuVisible && (
        <button className="button" onClick={handleDoneClick}>
         Download PDF
        </button>
      )}
      </form>
      
      
      
    </div>
  );
};
export default Notice;