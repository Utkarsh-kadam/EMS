import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function AuthenticationForm(props) {
  const [formData, setFormData] = useState({
    username: '',
    contact: '',
    college: '',
    prn: '',
    email: '',
    password: '',
  });
  const [loginMode, setLoginMode] = useState(true);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForms = () => {
    setLoginMode(!loginMode);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        axios.post("http://localhost:3000/event", formData)
        .then((res) => {
            console.log(res.data.message);
        })
      );

      if (response.status === 200 || response.status === 201) {
    
        const data = await response.json();
        localStorage.setItem('token', data.token);
        if (data.role === 'admin') {
          
          props.history.push('/event'); // Replace with the actual URL
        } else {
        
          props.history.push('/event'); // Replace with the actual URL
        }
      }
       else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`container ${loginMode ? '' : 'sign-up-mode'}`}>
      <div className="login-message" id="login-message">
        {message}
      </div>

      <div className="forms-container">
        <div className="signin-signup">
          <form
            action=""
            className={`sign-${loginMode ? 'in' : 'up'}-form`}
            onSubmit={handleSubmit}
          >
            <h2 className="title">
              {loginMode ? 'User Sign In' : 'User Sign Up'}
            </h2>
            {/* Input fields here with value and onChange */}
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
             <input
              type="text"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            {/* Repeat for other input fields */}
            <input
              type="submit"
              value={loginMode ? 'Login' : 'Sign Up'}
              className="btn solid"
            />
          </form>

          <button
            className="btn transparent"
            onClick={toggleForms}
            id="sign-up-btn"
          >
            {loginMode ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
     
    </div>
  );
}

export default AuthenticationForm;
