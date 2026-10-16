import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";

// Module routers
import authRoutes from "./modules/auth/auth.routes";
import patientRoutes from "./modules/patients/patient.routes";
import bedRoutes from "./modules/beds/bed.routes";
import taskRoutes from "./modules/tasks/task.routes";
import staffRoutes from "./modules/staff/staff.routes";
import departmentRoutes from "./modules/departments/department.routes";
import notificationRoutes from "./modules/notifications/notification.routes";

const app = express();

// Global middleware
app.use(cors({ origin: env.SOCKET_CORS_ORIGIN }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
