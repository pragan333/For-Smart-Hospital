import { Router, Request, Response } from "express";
import { prisma } from "../../config/db";
import { authenticate, authorize } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { CreateDepartmentSchema, CreateTransferSchema, Role } from "@smart-hospital/shared-types";

const router = Router();
router.use(authenticate);

// GET /api/departments
router.get("/", async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { beds: true, staff: true, patients: true } },
        headOfDept: true,
      },
      orderBy: { name: "asc" },
    });
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch departments" });
  }
});

// GET /api/departments/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
      include: {
        headOfDept: true,
        beds: { include: { currentPatient: true } },
        staff: { where: { isActive: true } },
        _count: { select: { patients: true, tasks: true } },
      },
    });
    if (!department) {
      res.status(404).json({ success: false, error: "Department not found" });
      return;
    }
    res.json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch department" });
  }
});

// POST /api/departments
router.post("/", authorize(Role.ADMIN), validate(CreateDepartmentSchema), async (req: Request, res: Response) => {
  try {
    const department = await prisma.department.create({ data: req.body });
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create department" });
  }
});

// PATCH /api/departments/:id
router.patch("/:id", authorize(Role.ADMIN), async (req: Request, res: Response) => {
  try {
    const department = await prisma.department.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update department" });
  }
});

// --- Transfer Requests ---

// POST /api/transfers
router.post("/transfers", validate(CreateTransferSchema), async (req: Request, res: Response) => {
  try {
    const patient = await prisma.patient.findUnique({ where: { id: req.body.patientId } });
    if (!patient) {
      res.status(404).json({ success: false, error: "Patient not found" });
      return;
    }

    const staff = await prisma.staff.findUnique({ where: { userId: req.user!.userId } });
    if (!staff) {
      res.status(403).json({ success: false, error: "Only staff can request transfers" });
      return;
    }

    const transfer = await prisma.transferRequest.create({
      data: {
        patientId: req.body.patientId,
        fromDepartmentId: patient.departmentId,
        toDepartmentId: req.body.toDepartmentId,
        requestedById: staff.id,
        reason: req.body.reason,
      },
      include: { patient: true, fromDepartment: true, toDepartment: true },
    });
    res.status(201).json({ success: true, data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create transfer request" });
  }
});

// GET /api/transfers
router.get("/transfers", async (req: Request, res: Response) => {
  try {
    const { status, departmentId } = req.query;
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (departmentId) {
      where.OR = [{ fromDepartmentId: departmentId }, { toDepartmentId: departmentId }];
    }

    const transfers = await prisma.transferRequest.findMany({
      where,
      include: { patient: true, fromDepartment: true, toDepartment: true, requestedBy: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: transfers });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch transfers" });
  }
});

// PATCH /api/transfers/:id/approve
router.patch("/transfers/:id/approve", async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({ where: { userId: req.user!.userId } });
    if (!staff) {
      res.status(403).json({ success: false, error: "Only staff can approve transfers" });
      return;
    }

    const transfer = await prisma.$transaction(async (tx) => {
      const updated = await tx.transferRequest.update({
        where: { id: req.params.id },
        data: { status: "APPROVED", approvedById: staff.id, resolvedAt: new Date() },
        include: { patient: true, toDepartment: true },
      });

      // Move patient to new department
      await tx.patient.update({
        where: { id: updated.patientId },
        data: { departmentId: updated.toDepartmentId, status: "TRANSFERRED" },
      });

      return updated;
    });

    res.json({ success: true, data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to approve transfer" });
  }
});

// PATCH /api/transfers/:id/reject
router.patch("/transfers/:id/reject", async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({ where: { userId: req.user!.userId } });
    const transfer = await prisma.transferRequest.update({
      where: { id: req.params.id },
      data: { status: "REJECTED", approvedById: staff?.id, resolvedAt: new Date() },
    });
    res.json({ success: true, data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to reject transfer" });
  }
});

export default router;
