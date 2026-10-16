import { Router, Request, Response } from "express";
import { prisma } from "../../config/db";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { CreatePatientSchema, AdmitPatientSchema } from "@smart-hospital/shared-types";

const router = Router();

// All patient routes require authentication
router.use(authenticate);

// GET /api/patients
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status, departmentId, search, page = "1", limit = "20" } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (departmentId) where.departmentId = departmentId;
    if (search) {
      where.OR = [
        { firstName: { contains: String(search), mode: "insensitive" } },
        { lastName: { contains: String(search), mode: "insensitive" } },
        { mrn: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take: Number(limit),
        include: { department: true, currentBed: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.patient.count({ where }),
    ]);

    res.json({
      success: true,
      data: patients,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch patients" });
  }
});

// POST /api/patients
router.post("/", validate(CreatePatientSchema), async (req: Request, res: Response) => {
  try {
    const mrn = `MRN-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const patient = await prisma.patient.create({
      data: { ...req.body, mrn, dateOfBirth: new Date(req.body.dateOfBirth) },
      include: { department: true },
    });
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create patient" });
  }
});

// GET /api/patients/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: { department: true, currentBed: true, admissions: { orderBy: { admittedAt: "desc" } } },
    });
    if (!patient) {
      res.status(404).json({ success: false, error: "Patient not found" });
      return;
    }
    res.json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch patient" });
  }
});

// PATCH /api/patients/:id
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const patient = await prisma.patient.update({
      where: { id: req.params.id },
      data: req.body,
      include: { department: true },
    });
    res.json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update patient" });
  }
});

// POST /api/patients/:id/admit
router.post("/:id/admit", validate(AdmitPatientSchema), async (req: Request, res: Response) => {
  try {
    const { departmentId, bedId, notes } = req.body;
    const patientId = req.params.id;

    const [patient, admission] = await prisma.$transaction(async (tx) => {
      const updatedPatient = await tx.patient.update({
        where: { id: patientId },
        data: { status: "ADMITTED", departmentId },
      });

      const newAdmission = await tx.admission.create({
        data: { patientId, departmentId, bedId, admittedById: req.user!.userId, notes },
      });

      if (bedId) {
        await tx.bed.update({
          where: { id: bedId },
          data: { status: "OCCUPIED", currentPatientId: patientId },
        });
      }

      return [updatedPatient, newAdmission];
    });

    res.json({ success: true, data: { patient, admission } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to admit patient" });
  }
});

// POST /api/patients/:id/discharge
router.post("/:id/discharge", async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;

    await prisma.$transaction(async (tx) => {
      await tx.patient.update({
        where: { id: patientId },
        data: { status: "DISCHARGED" },
      });

      // Close current admission
      const currentAdmission = await tx.admission.findFirst({
        where: { patientId, dischargedAt: null },
        orderBy: { admittedAt: "desc" },
      });

      if (currentAdmission) {
        await tx.admission.update({
          where: { id: currentAdmission.id },
          data: { dischargedAt: new Date() },
        });
      }

      // Release bed
      const bed = await tx.bed.findFirst({ where: { currentPatientId: patientId } });
      if (bed) {
        await tx.bed.update({
          where: { id: bed.id },
          data: { status: "AVAILABLE", currentPatientId: null },
        });
      }
    });

    res.json({ success: true, message: "Patient discharged" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to discharge patient" });
  }
});

export default router;
