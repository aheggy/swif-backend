const db = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserQuery = async ({
  first_name,
  last_name,
  username,
  password,
}) => {
  console.log(first_name, last_name, username, password);
  try {
    const existingUser = await db.oneOrNone(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser) {
      throw new Error("User with this username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.one(
      "INSERT INTO users (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4) RETURNING username",
      [first_name, last_name, username, hashedPassword]
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUserQuery = async ({ username, password }) => {
  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ 
      username: user.username 
    },process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );
    return token;
  } catch (error) {
    throw error;
  }
};

const getUsersQuery = async () => {
  try {
    const result = await db.query("SELECT * FROM users");
    // console.log("Database query result:", result);
    return result;
  } catch (error) {
    // console.error("Error fetching users:", error);
    throw error;
  }
};

const getOneUserQuery = async ({username}) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUserQuery, loginUserQuery, getUsersQuery, getOneUserQuery };
