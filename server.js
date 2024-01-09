// DEPENDENCIES
const app = require("./app.js");
const http = require('http');
const socketIO = require('socket.io');
const {createMessageQuery} = require("./queries/messages"); 
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
        // console.log(`Updated online status for ${username}`);
        console.log("sent status update to", username)

        socket.broadcast.emit('user_status_change', { username, isOnline: true });
    } else {
        // console.log(`Username ${username} not found in userSockets`);
    }
    });


    // Sending a new message
    socket.on('new_message', async (data) => {
        const { sender_username, recipient_username, text } = data;
        console.log(`Received message from ${sender_username} to ${recipient_username}: ${text}`);
        console.log("userSockets", userSockets);
            // store the message in the database
        try {
            await createMessageQuery(sender_username, recipient_username, text);
            console.log(`Message stored in database from ${sender_username} to ${recipient_username}`);
        } catch (error) {
            console.error(`Error storing message in database: ${error.message}`);
        }

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

    socket.on('track-info', (data) => {
        const recipientSocketId = userSockets[data.recipient]?.socketId;
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("track-info", { ...data });
        }
    });
      
    socket.on('screen-share-ended', (data) => {
        const { sender, recipient } = data;
        const recipientSocketId = userSockets[recipient]?.socketId;
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('screen-share-ended', { sender });
        }
    });
      

    socket.on("candidate", (data) => {
        console.log("received candidate",data)
        const { candidate, sender, recipient } = data;
        // const recipientSocketId = userSockets[recipient];
        const recipientSocketId = userSockets[recipient]?.socketId;
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("candidate", { candidate });
        }

    });

    socket.on('drawing', (data) => {
        const recipientSocketId = userSockets[data.recipient]?.socketId;
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('drawing', data);
        }
    });

    socket.on('clear_canvas', (data) => {
        const recipientSocketId = userSockets[data.recipient]?.socketId;
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('clear_canvas');
        }
    });


    socket.on('logout', (username) => {
        if (userSockets[username] && userSockets[username].socketId === socket.id) {
          console.log(`User ${username} logged out and disconnected.`);
          delete userSockets[username]; // Remove user from the active connections
          socket.disconnect(); 
        }
    });



    // User disconnection
    socket.on('disconnect', () => {
        let disconnectedUser = null;
        for (let username in userSockets) {
            if (userSockets[username].socketId === socket.id) {
                disconnectedUser = username;
                console.log(`User ${username} disconnected`);

                // Update the user's online status
                userSockets[username].isOnline = false;

                socket.broadcast.emit('user_status_change', { username, isOnline: false });
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
