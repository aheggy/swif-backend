const db = require("../db/dbConfig");

const createMessageQuery = async (senderUsername, recipientUsername, messageContent) => {
  const query = `INSERT INTO messages (sender_username, recipient_username, message_content)
                 VALUES ($1, $2, $3) RETURNING *`; 

  const values = [senderUsername, recipientUsername, messageContent];

  try {
      const message = await db.one(query, values);
      return message; 
  } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
  }
};


const getMessagesByUsernameQuery = async (username) => {
  const query = 'SELECT * FROM messages WHERE sender_username = $1 OR recipient_username = $1 ORDER BY timestamp ASC';
  const values = [username];
  
  try {
    const result = await db.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { createMessageQuery, getMessagesByUsernameQuery };
