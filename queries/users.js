const db = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (first_name, last_name, email, password) => {
  console.log(first_name, last_name)
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.one(
      'INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id',
      [first_name, last_name, email, hashedPassword]
    );

    return { message: 'User created', user_id: newUser.id };
  } catch (error) {
    console.error(error);
    throw new Error('User creation failed');
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await db.one('SELECT * FROM users WHERE email = $1', [email]);
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (passwordMatch) {
      const token = jwt.sign({ user: user.id }, 'your_secret_key');
      return { token };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
};

module.exports = { createUser, loginUser };
