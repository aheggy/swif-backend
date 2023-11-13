const { createMessageQuery, getMessagesByUserIdQuery } = require('../queries/messages');




const messagesController = {
  createMessage: async (req, res) => {
    console.log("body", req.body)
    const sender_id = req.user.user_id;
    const {recipient_id, message_content } = req.body;

    try {
      await messages.createMessageQuery(sender_id, recipient_id, message_content);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Error creating message" });
    }
  },


  getMessagesForUser: async (req, res) => {
    const userId = req.user.user_id; 

    try {
      const userMessages = await getMessagesByUserIdQuery(userId);
      res.json(userMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Error fetching messages" });
    }
  },

}


module.exports = messagesController;