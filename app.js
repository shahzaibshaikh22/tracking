const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

// Handle socket connection
io.on('connection', (socket) => {
    socket.on('send-location', (data) => {
       io.emit("recieve-location", {id:socket.id, ...data})
    });
    socket.on('disconnect', () => {
        io.emit("user-disconnected", socket.id)
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});