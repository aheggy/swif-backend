// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const passport = require("passport")
const usersController = require("./controllers/usersController.js");
const messagesController = require("./controllers/messagesController.js")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors({
  origin: `http://localhost:3000`
}));
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the SWIF App");
});

// Signup route
app.post("/signup", (req, res) => {
  console.log("Request Body:", req.body); 
  usersController.createUser(req, res);
});



// Login route
app.post("/login", (req, res) => {
  console.log("Request Body: ", req.body)
});


app.get("/people", usersController.people)



app.post('/messages', usersController.authenticateToken, messagesController.createMessage);
app.get('/messages', usersController.authenticateToken, messagesController.getMessagesForUser);
// app.post("/messages", (req, res) => {
//   console.log("Request Body:", req.body); 
//   messagesController.createMessage(req, res);
// });


// 404 PAGE
app.get("/*", (req, res) => {
    res.status(404).send("Page not found");
  });

// EXPORT
module.exports = app;
