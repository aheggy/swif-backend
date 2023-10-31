const express = require("express");
const users = express.Router();
const {
  getAllUsers,

} = require("../queries/users");

// INDEX
// Route to retrieve all users
users.get("/", async (req, res) => {
    const allUsers = await getAllUsers();
    if (allUsers[0]) {
      res.status(200).json(allUsers);
    } else {
      res.status(500).json({ error: "server error" });
    }
    // res.send("Welcome to the Users Page.");
  });

module.exports = users;