import { createServer } from "http";
import app from "./app";
import { env } from "./config/env";
import { initSocket } from "./config/socket";

const httpServer = createServer(app);

// Initialize Socket.IO
initSocket(httpServer);

httpServer.listen(env.PORT, () => {
  console.log(`🏥 Smart Hospital API running on http://localhost:${env.PORT}`);
  console.log(`📡 WebSocket server ready`);
});
