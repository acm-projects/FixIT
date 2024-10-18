require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const { auth } = require('express-openid-connect') //imports authentication middleware and helps create functions to handle user tasks like logins, etc

const app = express();

//how the app works with auth0 (clientID's, etc)
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
  };

  app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// middleware
app.use(express.json());
app.use(auth(config)); // this middleware will handle things like login, logout, and managing user sessions for the routes.

// route handling
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


// route handling
app.get('/', (req, res) => {
    res.json({mssg: "What's up"})
    console.log(req.oidc.isAuthenticated()) // checks if user is authenticated
});

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

