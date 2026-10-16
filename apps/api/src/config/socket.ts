import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { env } from "./env";

let io: SocketServer;

export function initSocket(httpServer: HttpServer): SocketServer {
  io = new SocketServer(httpServer, {
    cors: {
      origin: env.SOCKET_CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join:department", (departmentId: string) => {
      socket.join(`dept:${departmentId}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): SocketServer {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
}
