import { cn } from "@/lib/cn";

const statusColors: Record<string, string> = {
  // Patient statuses
  REGISTERED: "bg-blue-100 text-blue-700",
  ADMITTED: "bg-green-100 text-green-700",
  TRANSFERRED: "bg-amber-100 text-amber-700",
  DISCHARGED: "bg-gray-100 text-gray-700",
  // Bed statuses
  AVAILABLE: "bg-green-100 text-green-700",
  OCCUPIED: "bg-red-100 text-red-700",
  RESERVED: "bg-amber-100 text-amber-700",
  MAINTENANCE: "bg-gray-100 text-gray-700",
  // Task statuses
  PENDING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  ESCALATED: "bg-red-100 text-red-700",
  // Priority
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
  // Shift
  SCHEDULED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
  // Transfer
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusColors[status] || "bg-gray-100 text-gray-700",
        className
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
