require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const { auth } = require('express-openid-connect') //imports authentication middleware and helps create functions to handle user tasks like logins, etc

const app = express();

app.use(cors());


//how the app works with auth0(clientID's, etc)
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
  };

// middleware
app.use(express.json());

// this middleware will handle things like login, logout, and managing user sessions for the routes.
// below middleware levearges the config info to run above tasks like login, etc
app.use(auth(config))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.path, req.method);
  next();
});

// route handling
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to database and server running on port ${process.env.PORT}.`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

// auth code

// middleware - middle man between getting a request (e.g. GET request) and sending data

// route handling
app.get('/', (req, res) => {
    res.json({mssg: "What's up"})
    console.log(req.oidc.isAuthenticated()) // checks if user is authenticated
})

app.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated()) 
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out') // above and this line check is user is logged in and replies accordingly
    res.render("server", {title : "express demo"})
  })

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}.`)
// })