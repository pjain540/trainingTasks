const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const setupSocket = require("./socket/socket");

const server = http.createServer(app);
const io = new Server(server);

setupSocket(io);

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});