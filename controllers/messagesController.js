const { createMessageQuery, getMessagesByUsernameQuery } = require('../queries/messages');

const messagesController = {
  createMessage: async (req, res) => {
    const senderUsername = req.user.username; // Adjusted to use username
    const { recipientUsername, messageContent } = req.body; // Adjusted variable name

    try {
      await createMessageQuery(senderUsername, recipientUsername, messageContent);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Error creating message" });
    }
  },

  getMessagesForUser: async (req, res) => {
    const username = req.user.username; // Using username

    try {
      const userMessages = await getMessagesByUsernameQuery(username);
      res.json(userMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Error fetching messages" });
    }
  },
};


module.exports = messagesController;


// const messagesController = {
//   createMessage: async (req, res) => {
//     console.log("body", req.body)
//     const sender_id = req.user.user_id;
//     const {recipient_id, message_content } = req.body;

//     try {
//       await createMessageQuery(sender_id, recipient_id, message_content);
//       res.status(201).json({ message: "Message sent successfully" });
//     } catch (error) {
//       console.error("Error creating message:", error);
//       res.status(500).json({ error: "Error creating message" });
//     }
//   },


//   getMessagesForUser: async (req, res) => {
//     const username = req.user.username; 

//     try {
//       const userMessages = await getMessagesByUsernameQuery(userUsername);
//       res.json(userMessages);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       res.status(500).json({ error: "Error fetching messages" });
//     }
//   },

// }

