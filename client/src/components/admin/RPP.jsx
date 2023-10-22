import React, { useState, useEffect } from "react";
import Footer from "../utils/MGMfooter";
import { useParams } from 'react-router-dom';
import Header from "../utils/MGMheader";
import axios from "axios";


const RPP = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    designation: "",
    institute: "",
    workingExperience: "",
    areaOfExpertise: "",
    achievements: "",
    content:""
  });

  const { eventId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const [isOptionMenuVisible, setIsOptionMenuVisible] = useState(true); // State to control option menu visibility


  const handleDoneClick = () => {
    setIsOptionMenuVisible(false);

    // Prepare the RPP data to be sent to the server
    const rppData = {
      eventId,
      name: formData.name,
      contactNo: formData.contactNo,
      designation: formData.designation,
      institute: formData.institute,
      workingExperience: formData.workingExperience,
      areaOfExpertise: formData.areaOfExpertise,
      achievements: formData.achievements,
      content: formData.content,
    };

    // Send a POST request to save the RPP data
    axios
      .post("https://ems-api-63wi.onrender.com//admin/rpp", rppData)
      .then((response) => {
        console.log("RPP data saved successfully");
        setTimeout(() => {
          window.print();
        }, 100);
      })
      .catch((error) => {
        console.error("Failed to save RPP data:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://ems-api-63wi.onrender.com//admin/rpp/${eventId}`)
      .then((response) => {
        const savedRPPData = response.data;
        setFormData({
          name: savedRPPData.name,
          contactNo: savedRPPData.contactNo,
          designation: savedRPPData.designation,
          institute: savedRPPData.institute,
          workingExperience: savedRPPData.workingExperience,
          areaOfExpertise: savedRPPData.areaOfExpertise,
          achievements: savedRPPData.achievements,
          content: savedRPPData.content,
        });
      })
      .catch((error) => {
        console.error("Failed to retrieve RPP data:", error);
      });
  }, [eventId]);
  
  return (
    <div className="feedback-analysis">
      <Header></Header>
                
      <h4 className='feedback-heading'>Resource Person Profile</h4>
      <br/>

      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name" className="rpplabel">Name</label>
          <input
            className="rppinput"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contactNo" className="rpplabel">Contact No</label>
          <input
            className="rppinput"
            type="number"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="designation" className="rpplabel">Designation</label>
          <input
            className="rppinput"
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="institute" className="rpplabel">Institute</label>
          <input
            className="rppinput"
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="workingExperience" className="rpplabel">Working Experience</label>
          <input
            className="rppinput"
            type="number"
            name="workingExperience"
            value={formData.workingExperience}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="areaOfExpertise" className="rpplabel">Area of Expertise</label>
          <input
            className="rppinput"
            type="text"
            name="areaOfExpertise"
            value={formData.areaOfExpertise}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="achievements" className="rpplabel">Achievements</label>
          <input
            className="rppinput"
            type="text"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="details" className="rpplabel">Contents/Details of the activity:</label>
          <textarea
            className="rppinput"
            type="text"
            name="content"
            value={formData.content}
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
export default RPP;