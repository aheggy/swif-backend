// DEPENDENCIES
const http = require('http');
const socketIO = require('socket.io');
const app = require("./app.js");
const {createMessageQuery} = require("./queries/messages"); 
const { version } = require('os');

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// SERVER
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'https://swif.onrender.com', // Frontend URL
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
        userSockets[username] = socket.id;

       
        socket.emit('registration_successful', `Registered as ${username}`);
    });

    // Sending a new message
    socket.on('new_message', (data) => {
        const { sender_username, recipient_username, text } = data;
        console.log(`Received message from ${sender_username} to ${recipient_username}: ${text}`);
        console.log("userSockets", userSockets);

        const recipientSocketId = userSockets[recipient_username];
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
    

    // WebRTC

    socket.emit("connection-success", {
        status: "connection-success",
        socketId: socket.id,
    })


    socket.on("sdp", (data) => {
        console.log(data)
        socket.broadcast.emit("sdp", data)
    })


    // socket.on("sdp_answer", (data) => {
    //     console.log("answer______________", data)
        
    // })

    socket.on("candidate", data => {
        console.log("candidate",data)
        socket.broadcast.emit("candidate", data)

    })
    


  

    // User disconnection
    socket.on('disconnect', () => {
        for (let username in userSockets) {
            if (userSockets[username] === socket.id) {
                delete userSockets[username];
                console.log(`User ${username} disconnected`);
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
