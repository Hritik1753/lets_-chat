const express = require('express');
const socketIO = require('socket.io');

// Create an express app
const app = express();

// Set up the server
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Create a socket.io instance
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

const users = {};
io.on('connection', socket => {
    
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log(name, "joined the chat");
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        console.log(message);
        io.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        console.log("A user disconnected from the chat");
        delete users[socket.id];
    });
});






/*const express = require('express');
const socketIO = require('socket.io');

// Create an express app
const app = express();

// Set up the server
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Create a socket.io instance
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

const users = {};
io.on('connection', socket => {
    
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log(name, "joined the chat");
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        io.emit('receive', { message: message, name: users[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        console.log("A dissconnect the chat");
        delete users[socket.id];
    });
})
*/
