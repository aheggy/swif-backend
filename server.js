// DEPENDENCIES
const http = require('http');
const socketIO = require('socket.io');
const app = require("./app.js");
const {createMessageQuery} = require("./queries/messages"); 

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// SERVER
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// SOCKET.IO EVENT LISTENERS
const userSockets = {};  // Object to map usernames to socket IDs

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('register', (username) => {
        userSockets[username] = socket.id;
    });

    socket.on('new_message', async (data) => {
        const { sender_username, recipient_username, text } = data;

        try {
            const savedMessage = await createMessageQuery(sender_username, recipient_username, text);
            console.log('Emitting message:', savedMessage);

            const senderSocket = userSockets[sender_username];
            const recipientSocket = userSockets[recipient_username];

            if (senderSocket) {
                io.to(senderSocket).emit('new_message', savedMessage);
            }
            if (recipientSocket) {
                io.to(recipientSocket).emit('new_message', savedMessage);
            }
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        // Remove socket ID from userSockets
        for (let username in userSockets) {
            if (userSockets[username] === socket.id) {
                delete userSockets[username];
                break;
            }
        }
        console.log('Client disconnected:', socket.id);
    });
});


// LISTEN
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
