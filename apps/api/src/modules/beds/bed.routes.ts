import { Router, Request, Response } from "express";
import { prisma } from "../../config/db";
import { authenticate, authorize } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { CreateBedSchema, AssignBedSchema, Role } from "@smart-hospital/shared-types";
import { getIO } from "../../config/socket";

const router = Router();
router.use(authenticate);

// GET /api/beds
router.get("/", async (req: Request, res: Response) => {
  try {
    const { departmentId, status, bedType } = req.query;
    const where: Record<string, unknown> = {};
    if (departmentId) where.departmentId = departmentId;
    if (status) where.status = status;
    if (bedType) where.bedType = bedType;

    const beds = await prisma.bed.findMany({
      where,
      include: { department: true, currentPatient: true },
      orderBy: [{ departmentId: "asc" }, { bedNumber: "asc" }],
    });
    res.json({ success: true, data: beds });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch beds" });
  }
});

// GET /api/beds/stats
router.get("/stats", async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      where: { isActive: true },
      include: { beds: true },
    });

    const stats = departments.map((dept) => ({
      departmentId: dept.id,
      departmentName: dept.name,
      total: dept.beds.length,
      available: dept.beds.filter((b) => b.status === "AVAILABLE").length,
      occupied: dept.beds.filter((b) => b.status === "OCCUPIED").length,
      reserved: dept.beds.filter((b) => b.status === "RESERVED").length,
      maintenance: dept.beds.filter((b) => b.status === "MAINTENANCE").length,
      occupancyRate: dept.beds.length > 0
        ? Math.round((dept.beds.filter((b) => b.status === "OCCUPIED").length / dept.beds.length) * 100)
        : 0,
    }));

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch bed stats" });
  }
});

// POST /api/beds
router.post("/", authorize(Role.ADMIN), validate(CreateBedSchema), async (req: Request, res: Response) => {
  try {
    const bed = await prisma.bed.create({
      data: req.body,
      include: { department: true },
    });
    res.status(201).json({ success: true, data: bed });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create bed" });
  }
});

// PATCH /api/beds/:id
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const bed = await prisma.bed.update({
      where: { id: req.params.id },
      data: req.body,
      include: { department: true },
    });

    // Broadcast real-time update
    getIO().to(`dept:${bed.departmentId}`).emit("bed:status-change", bed);

    res.json({ success: true, data: bed });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update bed" });
  }
});

// POST /api/beds/:id/assign
router.post("/:id/assign", validate(AssignBedSchema), async (req: Request, res: Response) => {
  try {
    const { patientId } = req.body;
    const bed = await prisma.bed.update({
      where: { id: req.params.id },
      data: { status: "OCCUPIED", currentPatientId: patientId },
      include: { department: true, currentPatient: true },
    });

    getIO().to(`dept:${bed.departmentId}`).emit("bed:status-change", bed);

    res.json({ success: true, data: bed });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to assign bed" });
  }
});

// POST /api/beds/:id/release
router.post("/:id/release", async (req: Request, res: Response) => {
  try {
    const bed = await prisma.bed.update({
      where: { id: req.params.id },
      data: { status: "AVAILABLE", currentPatientId: null },
      include: { department: true },
    });

    getIO().to(`dept:${bed.departmentId}`).emit("bed:status-change", bed);

    res.json({ success: true, data: bed });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to release bed" });
  }
});

export default router;
