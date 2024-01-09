const users = require('../queries/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUserQuery, loginUserQuery, getUsersQuery, getOneUserQuery, updateUserQuery } = require("../queries/users");

const usersController = {
  
  createUser: async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    try {
      if (!first_name || !last_name || !username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newUser = await createUserQuery({ first_name, last_name, username, password });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error in createUser:", error);
      res.status(500).json({ error: error.message });
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        return res.status(400).json({ error: "username and password are required" });
      }
      const token = await loginUserQuery({ username, password });
      res.json({ token });
    } catch (error) {
      console.error("Error in loginUser:", error);
      res.status(500).json({ error: error.message });
    }
  },

  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },

  people: async (req, res) => {
    try {
      const users = await getUsersQuery();
      console.log('Sending users:', users); 
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },


  user: async (req, res) => {
    const { username } = req.params;
    console.log("user name for one query is ", req.body)
    try {
      const user = await getOneUserQuery({username});
      res.status(200).json(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("server error")
    }
  },


  updateUser: async (req, res) => {
    const { username } = req.params;
    const { firstName, lastName, gender, age, country, city, profileImage, bio, contactInfo, subjectInterests } = req.body;

    try {
        const userData = {
            firstName, lastName, gender, age, country, city, profileImage, bio, contactInfo, subjectInterests
        };
        await updateUserQuery(username, userData);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error in updateUser:", error);
        res.status(500).json({ error: error.message });
    }
  }


};

module.exports = usersController;
