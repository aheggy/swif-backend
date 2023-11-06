// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const passport = require("passport")
const usersController = require("./controllers/usersController.js");
const { validateToken } = require("./validations/auth.js");
const { body } = require("express-validator");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the SWIF App");
});

// Signup route
app.post("/signup",[
  body("email").isEmail()
], usersController.createUser);

// Login route
app.post("/login",[
  body("email").isEmail()
], usersController.loginUser);

// Logout route
app.post("/logout",validateToken, usersController.logOutUser);

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });

// EXPORT
module.exports = app;