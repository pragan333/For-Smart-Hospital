import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: parseInt(process.env.API_PORT || "4000", 10),
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  SOCKET_CORS_ORIGIN: process.env.SOCKET_CORS_ORIGIN || "http://localhost:3000",
};
