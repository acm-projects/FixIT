require('dotenv').config()
const express = require('express')
const app = express()

// middleware - middle man between getting a request (e.g. GET request) and sending data
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route handling
app.get('/', (req, res) => {
    res.json({mssg: "What's up"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`)
})