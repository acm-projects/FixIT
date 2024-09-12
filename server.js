require('dotenv').config()
console.log('PORT:', process.env.PORT)
const express = require('express')
const app = express()
const { auth } = require('express-openid-connect')


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

app.use(auth(config))

// route handling
app.get('/', (req, res) => {
    res.json({mssg: "What's up"})
    console.log(req.oidc.isAuthenticated())
})

app.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated())
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
    res.render("server", {title : "express demo"})
  })

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`)
})