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
    const result = await db.query("SELECT * FROM users ORDER BY first_name ASC");
    // console.log("Database query result:", result);
    return result;
  } catch (error) {
    // console.error("Error fetching users:", error);
    throw error;
  }
};

const getOneUserQuery = async ({ username }) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateUserQuery = async (username, userData) => {
  try {
      const result = await db.query(
          `UPDATE users
           SET first_name = $1, last_name = $2, gender = $3, age = $4, 
               country = $5, city = $6, profile_image_url = $7, bio = $8, 
               contact_info = $9, subject_interest = $10
           WHERE username = $11`,
          [
              userData.firstName,
              userData.lastName,
              userData.gender,
              userData.age,
              userData.country,
              userData.city,
              userData.profileImage,
              userData.bio,
              userData.contactInfo,
              userData.subjectInterests.join(','), 
              username
          ]
      );
      return result;
  } catch (error) {
      throw error;
  }
};



module.exports = { createUserQuery, loginUserQuery, getUsersQuery, getOneUserQuery, updateUserQuery };
