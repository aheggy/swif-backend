// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const usersController = require("./controllers/usersController.js");
const messagesController = require("./controllers/messagesController.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors({
  origin: 'https://swif-express.onrender.com', // Frontend URL
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

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
