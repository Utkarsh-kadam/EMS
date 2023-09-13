import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "./validate";
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";

function Registration() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    prn:"",
    college:"",
    contact:"",
    role:"user",
    IsAccepted: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Create a request object
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      // Make a POST request to your server's register endpoint
      const response = await fetch("http://localhost:3000/register/register", requestOptions);

      if (response.status === 201) {
       
        const data = await response.json();
        navigate("/"); 
      } else {
        const errorText = await response.text();
        notify(errorText);
      }
    } catch (error) {
      console.error("Error:", error);
      notify("An error occurred while registering");
    }
  };

  return (
    <div>
      <h2> College Event Management System</h2>
    <div className={styles.container}>
    <form className={styles.formLogin} onSubmit={handleRegistration} >
      <h2>Sign Up</h2>
      <div>
        <div className={errors.username && touched.username ? styles.unCompleted : !errors.username && touched.username ? styles.completed : undefined}>
          <input type="text" name="username" value={data.username} placeholder="Name" onChange={changeHandler} onFocus={focusHandler}  />
         
        </div>
        {errors.username && touched.username && <span className={styles.error}>{errors.username}</span>}
      </div>

      <div>
        <div className={errors.prn && touched.prn ? styles.unCompleted : !errors.prn && touched.prn ? styles.completed : undefined}>
          <input type="text" name="prn" value={data.prn} placeholder="PRN" onChange={changeHandler} onFocus={focusHandler}  />
        </div>
        {errors.prn && touched.prn && <span className={styles.error}>{errors.prn}</span>}
      </div>

      <div>
        <div className={errors.contact && touched.contact ? styles.unCompleted : !errors.contact && touched.contact ? styles.completed : undefined}>
          <input type="text" name="contact" value={data.contact} placeholder="Phone No" onChange={changeHandler} onFocus={focusHandler}  />
        </div>
        {errors.contact && touched.contact && <span className={styles.error}>{errors.contact}</span>}
      </div>

      <div>
        <div className={errors.college && touched.college ? styles.unCompleted : !errors.college && touched.college ? styles.completed : undefined}>
          <input type="text" name="college" value={data.college} placeholder="Collage / University" onChange={changeHandler} onFocus={focusHandler}  />
        </div>
        {errors.college && touched.college && <span className={styles.error}>{errors.college}</span>}
      </div>


      <div>
        <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
          <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
         
        </div>
        {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div>
        <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
          <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />

        </div>
        {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
      </div>

      <div>
        <button type="submit">Create Account</button>
        <span style={{ color: "black", textAlign: "center", display: "inline-block", width: "100%" }}>
         <h5> Already have a account?</h5> <Link to="/">Login</Link>
        </span>
      </div>
    </form>
    <ToastContainer />
  </div>
  </div>
);
};

export default Registration;