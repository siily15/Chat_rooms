const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connect', socket => {
    // Welcome current user
    socket.emit('mesaage', 'Welcome to Chat');

    // Broadcast when a user joins
    socket.broadcast.emit('message', 'A user connected');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', ('A user has left '));
    });

    // Listen for ChatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });
});

const PORT = 3000 || procress.env.PORT;

server.listen(PORT, ()=> console.log('server running on port ${PORT}'));
