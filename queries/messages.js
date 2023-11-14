const db = require("../db/dbConfig");

const createMessageQuery = async (senderId, recipientId, messageContent) => {
  const query = `INSERT INTO messages (sender_id, recipient_id, message_content)
                 VALUES ($1, $2, $3) RETURNING *`; 

  const values = [senderId, recipientId, messageContent];

  try {
      const message = await db.one(query, values);
      return message; 
  } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
  }
};


const getMessagesByUserIdQuery = async (userId) => {
  const query = 'SELECT * FROM messages WHERE sender_id = $1 OR recipient_id = $1 ORDER BY timestamp DESC';
  const values = [userId];
  
  try {
    const result = await db.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { createMessageQuery, getMessagesByUserIdQuery };
