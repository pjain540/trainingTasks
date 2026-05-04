const { activeConnections } = require("../metrics/metrics");

function setupSocket(io) {
    io.on("connection", (socket) => {
        activeConnections.inc();

        socket.on("disconnect", () => {
            activeConnections.dec();
        });
    });
}

module.exports = setupSocket;