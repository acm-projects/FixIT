require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');

const app = express();

// middleware - middle man between getting a request (e.g. GET request) and sending data
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// route handling
app.get('/', (req, res) => {
    res.json({mssg: "What's up"});
});

app.post('/', async (req, res) => { //async function - when the function is called, the program is allowed to do other stuff until the function w/ await keyword is done processing
    const {userID, firstName, lastName, email, yearClassification, major, password} = req.body;
    try {
        const user = await User.create({userID, firstName, lastName, email, yearClassification, major, password});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
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