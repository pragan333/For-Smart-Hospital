// ---- User & Auth Enums ----
export enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  NURSE = "NURSE",
  RECEPTIONIST = "RECEPTIONIST",
}

// ---- Patient Enums ----
export enum PatientStatus {
  REGISTERED = "REGISTERED",
  ADMITTED = "ADMITTED",
  TRANSFERRED = "TRANSFERRED",
  DISCHARGED = "DISCHARGED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

// ---- Bed Enums ----
export enum BedStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  RESERVED = "RESERVED",
  MAINTENANCE = "MAINTENANCE",
}

export enum BedType {
  GENERAL = "GENERAL",
  ICU = "ICU",
  PEDIATRIC = "PEDIATRIC",
  MATERNITY = "MATERNITY",
}

// ---- Task Enums ----
export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ESCALATED = "ESCALATED",
}

// ---- Staff Enums ----
export enum StaffRole {
  DOCTOR = "DOCTOR",
  NURSE = "NURSE",
  TECHNICIAN = "TECHNICIAN",
  ADMIN_STAFF = "ADMIN_STAFF",
}

export enum ShiftType {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT",
}

export enum ShiftStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

// ---- Transfer Enums ----
export enum TransferStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

// ---- Notification Enums ----
export enum NotificationType {
  TASK_ASSIGNED = "TASK_ASSIGNED",
  TRANSFER_REQUEST = "TRANSFER_REQUEST",
  SHIFT_CHANGE = "SHIFT_CHANGE",
  BED_UPDATE = "BED_UPDATE",
  PATIENT_ADMITTED = "PATIENT_ADMITTED",
  PATIENT_DISCHARGED = "PATIENT_DISCHARGED",
}
