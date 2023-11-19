// DEPENDENCIES
const http = require('http');
const socketIO = require('socket.io');
const app = require("./app.js");
const createMessage = require("./queries/messages"); 

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
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
  });

  socket.on('new_message', async (data) => {
    const { sender_username, recipient_username, text } = data;
    try {
      const message = await createMessage(sender_username, recipient_username, text);
      io.to(sender_username).to(recipient_username).emit('new_message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// LISTEN
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
