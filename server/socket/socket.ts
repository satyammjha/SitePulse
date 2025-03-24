import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;

export const initSocketServer = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: false
        },
        transports: ["websocket", "polling"]
    });

    io.on("connect", (socket: Socket) => {
        console.log("Client connected:", socket.id);

        socket.on("connect_error", (error) => {
            console.error("Socket error:", error);
        });

        socket.on("disconnect", (reason) => {
            console.log("Client disconnected:", socket.id, "Reason:", reason);
        });

        socket.emit("connection_status", "Connected successfully!");
    });
};

export const sendUpdate = (data: any) => {
    if (io) {
        console.log("[Socket] Emitting tick_update:", data);
        io.emit("tick_update", data);
    } else {
        console.warn("[Socket] Trying to emit before initialization");
    }
};