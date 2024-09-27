require('dotenv').config()
console.log('PORT:', process.env.PORT)
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { auth } = require('express-openid-connect') //imports authentication middleware and helps create functions to handle user tasks like logins, etc

//how the app works with auth0(clientID's, etc)
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
  };

// middleware - middle man between getting a request (e.g. GET request) and sending data

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// this middleware will handle things like login, logout, and managing user sessions for the routes.
// below middleware levearges the config info to run above tasks like login, etc
app.use(auth(config))

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

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`)
})
/*
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to database and server running on port ${process.env.PORT}.`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

*/
