const db = require("../db/dbConfig");
const jwt = require("jsonwebtoken");

/**
 * Validates the token from the request headers and checks its validity in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to be called in the middleware chain.
 * @returns {Promise} A promise that resolves with the result of token validation.
 */
const validateToken = async (req, res, next) => {
	const token =
		req.headers["authorization"] &&
		req.headers["authorization"].split(" ")[1];
	if (!token) {
		return res.status(401).json({ error: "Token missing" });
	}

	jwt.verify(token,"your_secret_key",(err,decoded)=>{
		if(err){
            return res.status(401).json({error:err.message})
        }
	})

	try {
		const result = await validateTokenFromDB(token);
		if (result) {
			next();
		} else {
			return res.status(401).json({ error: "Invalid token" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Token validation failed" });
	}
};

/**
 * Validates the token from the database.
 * @param {string} token - The token to be validated.
 * @returns {Promise<boolean>} A promise that resolves with the result of token validation.
 * @throws Will throw an error if the token validation process fails.
 */
const validateTokenFromDB = async (token) => {
	try {
		const result = await db.oneOrNone(
			"SELECT * FROM users_logins WHERE token = $1 AND status = 1",
			[token]
		);
		if (result) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error(error);
		throw new Error("Token validation failed");
	}
};

module.exports = { validateToken };
