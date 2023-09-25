

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./db/dbConnect");
const path = require("path");
const cors = require("cors")
const authMiddleware = require("./routes/auth");



const corsOptions = {
    origin: '*', // Replace with the URL of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // This allows cookies to be sent with the request (if needed)
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// execute database connection 
dbConnect();

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const eventRoute = require("./routes/event")
const eventregister = require("./routes/eventregister");
const userEvent = require("./routes/userEvents");
const admin = require("./routes/admin");

// Mount the routes on specific paths
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/event",eventRoute); // route for event operation
app.use("/eventregister", eventregister); // route to register a user for event
app.use("/user", userEvent); //route for user operations
app.use("/admin",admin); //route for admin operations



module.exports = app;