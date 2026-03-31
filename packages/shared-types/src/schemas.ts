import { z } from "zod";
import {
  Role,
  PatientStatus,
  Gender,
  BedStatus,
  BedType,
  Priority,
  TaskStatus,
  StaffRole,
  ShiftType,
  ShiftStatus,
  TransferStatus,
  NotificationType,
} from "./enums";

// ---- Auth Schemas (Developer A) ----

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.nativeEnum(Role),
});

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    role: z.nativeEnum(Role),
  }),
});

// ---- Patient Schemas (Developer A) ----

export const CreatePatientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string().datetime(),
  gender: z.nativeEnum(Gender),
  contactPhone: z.string().optional(),
  emergencyContact: z.string().optional(),
  departmentId: z.string().uuid(),
});

export const AdmitPatientSchema = z.object({
  departmentId: z.string().uuid(),
  bedId: z.string().uuid().optional(),
  notes: z.string().optional(),
});

export const PatientSchema = z.object({
  id: z.string().uuid(),
  mrn: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  gender: z.nativeEnum(Gender),
  contactPhone: z.string().nullable(),
  emergencyContact: z.string().nullable(),
  status: z.nativeEnum(PatientStatus),
  departmentId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ---- Bed Schemas (Developer B) ----

export const CreateBedSchema = z.object({
  bedNumber: z.string().min(1),
  ward: z.string().min(1),
  departmentId: z.string().uuid(),
  bedType: z.nativeEnum(BedType),
});

export const AssignBedSchema = z.object({
  patientId: z.string().uuid(),
});

export const BedSchema = z.object({
  id: z.string().uuid(),
  bedNumber: z.string(),
  ward: z.string(),
  departmentId: z.string().uuid(),
  status: z.nativeEnum(BedStatus),
  bedType: z.nativeEnum(BedType),
  currentPatientId: z.string().uuid().nullable(),
  updatedAt: z.string(),
});

export const BedStatsSchema = z.object({
  departmentId: z.string().uuid(),
  departmentName: z.string(),
  total: z.number(),
  available: z.number(),
  occupied: z.number(),
  reserved: z.number(),
  maintenance: z.number(),
  occupancyRate: z.number(),
});

// ---- Task Schemas (Developer B) ----

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority),
  departmentId: z.string().uuid(),
  assignedToId: z.string().uuid().optional(),
  patientId: z.string().uuid().optional(),
  dueAt: z.string().datetime().optional(),
});

export const UpdateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  assignedToId: z.string().uuid().optional(),
});

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(TaskStatus),
  departmentId: z.string().uuid(),
  assignedToId: z.string().uuid().nullable(),
  patientId: z.string().uuid().nullable(),
  createdById: z.string().uuid(),
  dueAt: z.string().nullable(),
  completedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ---- Staff Schemas (Developer C) ----

export const CreateStaffSchema = z.object({
  userId: z.string().uuid(),
  employeeId: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.nativeEnum(StaffRole),
  specialization: z.string().optional(),
  departmentId: z.string().uuid(),
});

export const StaffSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  employeeId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.nativeEnum(StaffRole),
  specialization: z.string().nullable(),
  departmentId: z.string().uuid(),
  isActive: z.boolean(),
});

// ---- Shift Schemas (Developer C) ----

export const CreateShiftSchema = z.object({
  staffId: z.string().uuid(),
  departmentId: z.string().uuid(),
  shiftType: z.nativeEnum(ShiftType),
  date: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  notes: z.string().optional(),
});

export const ShiftSchema = z.object({
  id: z.string().uuid(),
  staffId: z.string().uuid(),
  departmentId: z.string().uuid(),
  shiftType: z.nativeEnum(ShiftType),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.nativeEnum(ShiftStatus),
  notes: z.string().nullable(),
});

// ---- Department Schemas (Developer C) ----

export const CreateDepartmentSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1).max(10),
  floor: z.number().int().optional(),
  building: z.string().optional(),
  capacity: z.number().int().positive(),
});

export const DepartmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  code: z.string(),
  floor: z.number().nullable(),
  building: z.string().nullable(),
  capacity: z.number(),
  isActive: z.boolean(),
});

// ---- Transfer Schemas (Developer C) ----

export const CreateTransferSchema = z.object({
  patientId: z.string().uuid(),
  toDepartmentId: z.string().uuid(),
  reason: z.string().min(1),
});

export const TransferSchema = z.object({
  id: z.string().uuid(),
  patientId: z.string().uuid(),
  fromDepartmentId: z.string().uuid(),
  toDepartmentId: z.string().uuid(),
  requestedById: z.string().uuid(),
  approvedById: z.string().uuid().nullable(),
  status: z.nativeEnum(TransferStatus),
  reason: z.string(),
  createdAt: z.string(),
  resolvedAt: z.string().nullable(),
});

// ---- Notification Schema (Developer C) ----

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  recipientId: z.string().uuid(),
  type: z.nativeEnum(NotificationType),
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  referenceType: z.string().nullable(),
  referenceId: z.string().nullable(),
  createdAt: z.string(),
});

// ---- Socket Events ----

export const SocketEvents = {
  BED_STATUS_CHANGE: "bed:status-change",
  TASK_ASSIGNED: "task:assigned",
  TASK_UPDATED: "task:updated",
  NOTIFICATION_NEW: "notification:new",
} as const;
