// DEPENDENCIES
const app = require("./app.js");
const http = require('http');
const socketIO = require('socket.io');
// const {createMessageQuery} = require("./queries/messages"); 
const { version } = require('os');

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// SERVER
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        // origin: 'http://localhost:3000',
      origin: 'https://swif.onrender.com', // Front-end application's URL
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

// SOCKET.IO EVENT LISTENERS
const userSockets = {};  // Object to map usernames to socket IDs

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // User registration
    socket.on('register', (username) => {
        console.log(`Registering user: ${username} with socket ID: ${socket.id}`);
        // userSockets[username] = socket.id;
        userSockets[username] = { socketId: socket.id, isOnline: true };
        // Broadcast the user's online status to other users
        socket.broadcast.emit('user_status_change', { username, isOnline: true });


        console.log(userSockets)

       
        socket.emit('registration_successful', `Registered as ${username}`);
    });

socket.on('heartbeat', (data) => {
  const { username } = data;
  console.log(`Heartbeat event received from ${username}`);
  if (userSockets[username]) {
    userSockets[username].isOnline = true;
    console.log(`Updated online status for ${username}`);
    socket.broadcast.emit('user_status_change', { username, isOnline: true });
  } else {
    console.log(`Username ${username} not found in userSockets`);
  }
});


    // Sending a new message
    socket.on('new_message', (data) => {
        const { sender_username, recipient_username, text } = data;
        console.log(`Received message from ${sender_username} to ${recipient_username}: ${text}`);
        console.log("userSockets", userSockets);

        // const recipientSocketId = userSockets[recipient_username];
        const recipientSocketId = userSockets[recipient_username]?.socketId;

        if (recipientSocketId) {
            io.to(recipientSocketId).emit('new_message', {
                recipient_username,
                sender_username,
                text
            });
            console.log(`Message sent to ${recipient_username}`);
        } else {
            console.log(`Recipient ${recipient_username} not found.`);
        }

        console.log("userSockets", userSockets)
    });
    

    socket.on("sdp", (data) => {
        console.log(data)
        const { sdp, sender, recipient } = data;
        // const recipientSocketId = userSockets[recipient];
        const recipientSocketId = userSockets[recipient]?.socketId;
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("sdp", { sdp, sender: sender, recipient: recipient });
        }
    });


    socket.on("candidate", (data) => {
        console.log("######################")

        console.log("received candidate",data)
        const { candidate, sender, recipient } = data;
        // const recipientSocketId = userSockets[recipient];
        const recipientSocketId = userSockets[recipient]?.socketId;
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("candidate", { candidate });
        }

    });


    // User disconnection
    socket.on('disconnect', () => {
    let disconnectedUser = null;
    for (let username in userSockets) {
        if (userSockets[username].socketId === socket.id) {
            disconnectedUser = username;
            userSockets[username].isOnline = false;
            console.log(`User ${username} disconnected`);
            break;
        }
    }
    
    // Broadcast the user's offline status to other users
    if (disconnectedUser) {
        socket.broadcast.emit('user_status_change', { username: disconnectedUser, isOnline: false });
    }

    console.log('Client disconnected:', socket.id);
    });
});


// LISTEN
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
