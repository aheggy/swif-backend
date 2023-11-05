const users = require('../queries/users');

const usersController = {
  createUser: async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
      const result = await users.createUser(first_name, last_name, email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    console.log(first_name, last_name)
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await users.loginUser(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};

module.exports = usersController;
