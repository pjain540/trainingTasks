// src/store/socketSlice.ts
import { io } from "socket.io-client";

export const createSocketSlice = (set: any, get: any) => ({
    socket: null,

    connectSocket: () => {
        const socket = io("http://localhost:3000");

        socket.on("transaction:update", (data) => {
            // directly update store
            get().updateTransaction(data.id, data);
        });

        set((state: any) => {
            state.socket = socket;
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        socket?.disconnect();

        set((state: any) => {
            state.socket = null;
        });
    },
});