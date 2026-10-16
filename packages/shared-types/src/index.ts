export * from "./enums";
export * from "./schemas";

// Re-export inferred types from Zod schemas for convenience
import type { z } from "zod";
import type {
  LoginSchema,
  RegisterSchema,
  AuthResponseSchema,
  CreatePatientSchema,
  AdmitPatientSchema,
  PatientSchema,
  CreateBedSchema,
  AssignBedSchema,
  BedSchema,
  BedStatsSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  TaskSchema,
  CreateStaffSchema,
  StaffSchema,
  CreateShiftSchema,
  ShiftSchema,
  CreateDepartmentSchema,
  DepartmentSchema,
  CreateTransferSchema,
  TransferSchema,
  NotificationSchema,
} from "./schemas";

// Auth types
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// Patient types (Developer A)
export type CreatePatientInput = z.infer<typeof CreatePatientSchema>;
export type AdmitPatientInput = z.infer<typeof AdmitPatientSchema>;
export type Patient = z.infer<typeof PatientSchema>;

// Bed types (Developer B)
export type CreateBedInput = z.infer<typeof CreateBedSchema>;
export type AssignBedInput = z.infer<typeof AssignBedSchema>;
export type Bed = z.infer<typeof BedSchema>;
export type BedStats = z.infer<typeof BedStatsSchema>;

// Task types (Developer B)
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
export type Task = z.infer<typeof TaskSchema>;

// Staff types (Developer C)
export type CreateStaffInput = z.infer<typeof CreateStaffSchema>;
export type Staff = z.infer<typeof StaffSchema>;

// Shift types (Developer C)
export type CreateShiftInput = z.infer<typeof CreateShiftSchema>;
export type Shift = z.infer<typeof ShiftSchema>;

// Department types (Developer C)
export type CreateDepartmentInput = z.infer<typeof CreateDepartmentSchema>;
export type Department = z.infer<typeof DepartmentSchema>;

// Transfer types (Developer C)
export type CreateTransferInput = z.infer<typeof CreateTransferSchema>;
export type Transfer = z.infer<typeof TransferSchema>;

// Notification types (Developer C)
export type Notification = z.infer<typeof NotificationSchema>;

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
