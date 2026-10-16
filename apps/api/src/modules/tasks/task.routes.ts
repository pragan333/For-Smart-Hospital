import { Router, Request, Response } from "express";
import { prisma } from "../../config/db";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { CreateTaskSchema, UpdateTaskSchema } from "@smart-hospital/shared-types";
import { getIO } from "../../config/socket";

const router = Router();
router.use(authenticate);

// GET /api/tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status, priority, assignedToId, departmentId, page = "1", limit = "20" } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedToId) where.assignedToId = assignedToId;
    if (departmentId) where.departmentId = departmentId;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: Number(limit),
        include: { department: true, assignedTo: true, patient: true, createdBy: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.task.count({ where }),
    ]);

    res.json({ success: true, data: tasks, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch tasks" });
  }
});

// POST /api/tasks
router.post("/", validate(CreateTaskSchema), async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.create({
      data: { ...req.body, createdById: req.user!.userId },
      include: { department: true, assignedTo: true },
    });

    if (task.assignedToId) {
      getIO().to(`dept:${task.departmentId}`).emit("task:assigned", task);
    }

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create task" });
  }
});

// GET /api/tasks/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: { department: true, assignedTo: true, patient: true, createdBy: true },
    });
    if (!task) {
      res.status(404).json({ success: false, error: "Task not found" });
      return;
    }
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch task" });
  }
});

// PATCH /api/tasks/:id
router.patch("/:id", validate(UpdateTaskSchema), async (req: Request, res: Response) => {
  try {
    const data: Record<string, unknown> = { ...req.body };
    if (req.body.status === "COMPLETED") {
      data.completedAt = new Date();
    }

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data,
      include: { department: true, assignedTo: true },
    });

    getIO().to(`dept:${task.departmentId}`).emit("task:updated", task);

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update task" });
  }
});

// POST /api/tasks/:id/escalate
router.post("/:id/escalate", async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { status: "ESCALATED", priority: "URGENT" },
      include: { department: true, assignedTo: true },
    });

    getIO().to(`dept:${task.departmentId}`).emit("task:updated", task);

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to escalate task" });
  }
});

export default router;
