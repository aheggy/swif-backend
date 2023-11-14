// DEPENDENCIES
const app = require("./app.js");
// const app = require('express')();
const http = require('http'); // You need to require the 'http' module

// SOCKET.IO INITIALIZATION
const server = http.createServer(app); // Use a different variable name here
const io = require('socket.io')(server);

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT || 3000; 

// SOCKET.IO EVENT LISTENERS
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle message events
    socket.on('new_message', async (data) => {
        const { senderId, recipientId, text } = data;

        // Store message in the database
        try {
            await messages.createMessage(senderId, recipientId, text);
            // Emit the message to all clients
            io.emit('new_message', { senderId, recipientId, text });
        } catch (error) {
            console.error('Error saving message:', error);
            // Handle error (e.g., send error to the sender)
        }
    });

    // Handle client disconnections
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        // Handle disconnection (e.g., update user status)
    });
});

// LISTEN
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

