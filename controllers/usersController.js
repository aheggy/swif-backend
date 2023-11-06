const users = require('../queries/users');

/**
 * Handles the creation of a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves with the result of the user creation process.
 */
const createUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const result = await users.createUser(first_name, last_name, email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    console.log(first_name, last_name)
};

/**
 * Handles the user login process.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves with the result of the user login process.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await users.loginUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

/**
 * Handles the user logout process.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves with the result of the user logout process.
 */
const logOutUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const result = await users.logOutUser(token);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { createUser, loginUser, logOutUser };
