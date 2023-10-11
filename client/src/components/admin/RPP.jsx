import React, { useState } from "react";
import Footer from "../utils/MGMfooter";
import Header from "../utils/MGMheader";
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
    // Hide the delete buttons
    const deleteButtons = document.querySelectorAll(".delete-button");
    // Set isOptionMenuVisible to false
    setIsOptionMenuVisible(false);
    setTimeout(() => {
      window.print();
    }, 100); 


  };
  
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