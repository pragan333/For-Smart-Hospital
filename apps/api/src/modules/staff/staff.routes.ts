import { Router, Request, Response } from "express";
import { prisma } from "../../config/db";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { CreateStaffSchema, CreateShiftSchema } from "@smart-hospital/shared-types";

const router = Router();
router.use(authenticate);

// GET /api/staff
router.get("/", async (req: Request, res: Response) => {
  try {
    const { departmentId, role, isActive } = req.query;
    const where: Record<string, unknown> = {};
    if (departmentId) where.departmentId = departmentId;
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === "true";

    const staff = await prisma.staff.findMany({
      where,
      include: { department: true, user: { select: { email: true } } },
      orderBy: { lastName: "asc" },
    });
    res.json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch staff" });
  }
});

// POST /api/staff
router.post("/", validate(CreateStaffSchema), async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.create({
      data: req.body,
      include: { department: true },
    });
    res.status(201).json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create staff" });
  }
});

// GET /api/staff/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: req.params.id },
      include: { department: true, user: { select: { email: true } }, shifts: { orderBy: { date: "desc" }, take: 10 } },
    });
    if (!staff) {
      res.status(404).json({ success: false, error: "Staff not found" });
      return;
    }
    res.json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch staff" });
  }
});

// PATCH /api/staff/:id
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.update({
      where: { id: req.params.id },
      data: req.body,
      include: { department: true },
    });
    res.json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update staff" });
  }
});

// GET /api/staff/:id/schedule
router.get("/:id/schedule", async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    const where: Record<string, unknown> = { staffId: req.params.id };
    if (from || to) {
      where.date = {};
      if (from) (where.date as Record<string, unknown>).gte = new Date(String(from));
      if (to) (where.date as Record<string, unknown>).lte = new Date(String(to));
    }

    const shifts = await prisma.shift.findMany({
      where,
      include: { department: true },
      orderBy: { date: "asc" },
    });
    res.json({ success: true, data: shifts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch schedule" });
  }
});

// --- Shift endpoints ---

// GET /api/shifts
router.get("/shifts/list", async (req: Request, res: Response) => {
  try {
    const { departmentId, date, staffId } = req.query;
    const where: Record<string, unknown> = {};
    if (departmentId) where.departmentId = departmentId;
    if (staffId) where.staffId = staffId;
    if (date) where.date = new Date(String(date));

    const shifts = await prisma.shift.findMany({
      where,
      include: { staff: true, department: true },
      orderBy: { startTime: "asc" },
    });
    res.json({ success: true, data: shifts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch shifts" });
  }
});

// POST /api/shifts
router.post("/shifts", validate(CreateShiftSchema), async (req: Request, res: Response) => {
  try {
    const shift = await prisma.shift.create({
      data: {
        ...req.body,
        date: new Date(req.body.date),
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
      },
      include: { staff: true, department: true },
    });
    res.status(201).json({ success: true, data: shift });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create shift" });
  }
});

// PATCH /api/shifts/:id
router.patch("/shifts/:id", async (req: Request, res: Response) => {
  try {
    const shift = await prisma.shift.update({
      where: { id: req.params.id },
      data: req.body,
      include: { staff: true, department: true },
    });
    res.json({ success: true, data: shift });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update shift" });
  }
});

export default router;
