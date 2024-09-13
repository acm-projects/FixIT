require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// middleware - middle man between getting a request (e.g. GET request) and sending data
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// route handling
app.get('/', (req, res) => {
    res.json({mssg: "What's up"});
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