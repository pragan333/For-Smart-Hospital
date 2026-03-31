import { cn } from "@/lib/cn";

// Developer B: Replace with real-time API data via Socket.IO
const mockBeds = [
  { id: "1", bedNumber: "ER-001", status: "OCCUPIED", department: "Emergency Room", patient: "Alice Brown" },
  { id: "2", bedNumber: "ER-002", status: "AVAILABLE", department: "Emergency Room", patient: null },
  { id: "3", bedNumber: "ER-003", status: "RESERVED", department: "Emergency Room", patient: null },
  { id: "4", bedNumber: "ER-004", status: "MAINTENANCE", department: "Emergency Room", patient: null },
  { id: "5", bedNumber: "ICU-001", status: "OCCUPIED", department: "ICU", patient: "Bob Wilson" },
  { id: "6", bedNumber: "ICU-002", status: "AVAILABLE", department: "ICU", patient: null },
  { id: "7", bedNumber: "ICU-003", status: "OCCUPIED", department: "ICU", patient: "Diana Martinez" },
  { id: "8", bedNumber: "ICU-004", status: "AVAILABLE", department: "ICU", patient: null },
];

const statusColor: Record<string, string> = {
  AVAILABLE: "bg-green-100 border-green-300 text-green-700",
  OCCUPIED: "bg-red-100 border-red-300 text-red-700",
  RESERVED: "bg-amber-100 border-amber-300 text-amber-700",
  MAINTENANCE: "bg-gray-100 border-gray-300 text-gray-500",
};

export default function BedsPage() {
  const stats = {
    total: mockBeds.length,
    available: mockBeds.filter((b) => b.status === "AVAILABLE").length,
    occupied: mockBeds.filter((b) => b.status === "OCCUPIED").length,
    reserved: mockBeds.filter((b) => b.status === "RESERVED").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bed Management</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-green-400" /> Available ({stats.available})
          <span className="w-3 h-3 rounded-full bg-red-400 ml-3" /> Occupied ({stats.occupied})
          <span className="w-3 h-3 rounded-full bg-amber-400 ml-3" /> Reserved ({stats.reserved})
        </div>
      </div>

      {/* Occupancy Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Overall Occupancy</p>
            <p className="text-3xl font-bold text-gray-900">{Math.round((stats.occupied / stats.total) * 100)}%</p>
          </div>
          <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full"
              style={{ width: `${(stats.occupied / stats.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bed Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {mockBeds.map((bed) => (
          <div
            key={bed.id}
            className={cn(
              "p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-shadow",
              statusColor[bed.status]
            )}
          >
            <p className="font-mono font-bold text-sm">{bed.bedNumber}</p>
            <p className="text-xs mt-1">{bed.status}</p>
            {bed.patient && <p className="text-xs mt-1 font-medium">{bed.patient}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
