import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [college, setCollege] = useState("");
  const [prn, setPrn] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Create a request object
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        username,
        contact,
        college,
        prn,
        role: "user", 
      }),
    };

    try {
      // Make a POST request to your server's register endpoint
      const response = await fetch("http://localhost:3000/register/register", requestOptions);

      if (response.status === 201) {
       
        const data = await response.json();
        navigate("/"); 
      } else {
        
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while registering");
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div>
          <label>College/University:</label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
        </div>
        <div>
          <label>PRN:</label>
          <input
            type="number"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Registration;