const db = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Creates a new user in the database if it doesn't already exist.
 * @param {string} first_name - The first name of the user.
 * @param {string} last_name - The last name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves when the user is created.
 * @throws Will throw an error if any required field is missing or if a user with the same email already exists.
 */
const createUser = async (first_name, last_name, country, email, password) => {
	try {
		if (!first_name || !last_name || !email || !password) {
			throw new Error("Missing required fields");
		}

		const existingUser = await db.oneOrNone(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);
		if (existingUser) {
			throw new Error("User with this email already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await db.one(
			"INSERT INTO users (first_name, last_name, country, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id",
			[first_name, last_name, country, email, hashedPassword]
		);

		return { message: "User created", user_id: newUser.id };
	} catch (error) {
		console.error(error);
		throw new Error("User creation failed");
	}
};

/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves with the user's authentication token upon successful login.
 * @throws Will throw an error if the email or password is missing, or if the credentials are invalid.
 */
const loginUser = async (email, password) => {
	try {
		if (!email || !password) {
			throw new Error("Email and password are required");
		}

		const user = await db.one("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		const passwordMatch = await bcrypt.compare(
			password,
			user.password_hash
		);

		if (passwordMatch) {
			const token = jwt.sign({ user: user.id }, "your_secret_key", {
				expiresIn: "1h",
			});
			await saveToken(user.id, token);
			return { token };
		} else {
			throw new Error("Invalid credentials");
		}
	} catch (error) {
		console.error(error);
		throw new Error("Login failed");
	}
};

/**
 * Saves the authentication token for a user in the database.
 * @param {number} userId - The ID of the user.
 * @param {string} token - The authentication token to be saved.
 * @throws Will throw an error if the token saving process fails.
 */

const saveToken = async (userId, token) => {
	try {
		await db.none(
			"INSERT INTO users_logins (user_id, token, status) VALUES ($1, $2, 1)",
			[userId, token]
		);
	} catch (error) {
		console.error(error);
		throw new Error("Token saving failed");
	}
};

/**
 * Logs out a user by updating the status of the authentication token in the database.
 * @param {string} token - The authentication token to be invalidated.
 * @throws Will throw an error if the status update process fails.
 */
const logOutUser = async (token) => {
	try {
		await db.none("UPDATE users_logins SET status = 0 WHERE token = $1", [
			token,
		]);
	} catch (error) {
		console.error(error);
		throw new Error("Status update failed");
	}
};

module.exports = { createUser, loginUser, logOutUser };
