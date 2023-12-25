// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIO = require('socket.io');
const usersController = require("./controllers/usersController.js");
const messagesController = require("./controllers/messagesController.js");
const subjectsController = require("./controllers/subjectsController.js")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors({
  // origin: 'http://localhost:3000', // Frontend URL
  origin: 'https://swif.onrender.com', // Frontend URL
  credentials: true
}));

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to the SWIF App");
});

app.post("/signup", usersController.createUser);
app.post("/login", usersController.loginUser);
app.get("/user/:username", usersController.user);
app.get("/people", usersController.people);
app.post('/messages', usersController.authenticateToken, messagesController.createMessage);
app.get('/messages', usersController.authenticateToken, messagesController.getMessagesForUser);
app.get('/subjects', subjectsController.getAllSubjects)

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
