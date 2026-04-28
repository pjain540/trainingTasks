// utils/socket.ts
import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
    io = new Server(server);
};

export const emitAlert = (data: any) => {
    io.emit("job-failed", data);
};