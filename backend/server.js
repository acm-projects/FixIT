require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const chatBotRoutes = require('./routes/chatBot');
const { auth } = require('express-openid-connect'); // imports authentication middleware and helps create functions to handle user tasks like logins, etc

const app = express();


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
app.use(auth(config)); // this middleware will handle things like login, logout, and managing user sessions for the routes.

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/chatBot', chatBotRoutes);
app.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated()) // checks if user is authenticated
});

// connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to database and server running on port ${process.env.PORT}.`);
        });
    })
    .catch((error) => {
        console.log(error);
    });