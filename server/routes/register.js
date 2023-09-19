const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../db/userModel");


router.post("/register", (request, response) => {
  const role = request.body.role;
    // hash the password
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
          email:request.body.email,
          password: hashedPassword,
          username:request.body.username,
          contact:request.body.contact,
          college:request.body.college,
          prn:request.body.prn,
          role: role, //Set Role
          
        });
  
        // save the new user
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error) => {
            response.status(500).send("Error creating user");
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        response.status(500).send("Password was not hashed successfully");
      });
  });

module.exports = router;
