const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Add CORS middleware

const app = express();
app.use(cors()); // Enable CORS for all routes


app.get('/', (req, res) => {
  res.send('Hello, this is the server!');
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('location', (data) => {
    console.log(`Location received from ${socket.id}:`, data);
    io.emit('location', data); // Broadcast the location to all connected clients
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
