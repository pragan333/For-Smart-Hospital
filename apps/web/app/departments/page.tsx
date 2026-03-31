import { Card } from "@/components/ui/Card";

// Developer C: Replace with API data
const mockDepartments = [
  { id: "1", name: "Emergency Room", code: "ER", floor: 1, beds: 15, occupancy: 80, staff: 12, patients: 10 },
  { id: "2", name: "Intensive Care Unit", code: "ICU", floor: 2, beds: 10, occupancy: 90, staff: 8, patients: 9 },
  { id: "3", name: "Cardiology", code: "CARD", floor: 3, beds: 8, occupancy: 62, staff: 6, patients: 5 },
  { id: "4", name: "Pediatrics", code: "PED", floor: 4, beds: 8, occupancy: 50, staff: 5, patients: 4 },
  { id: "5", name: "Orthopedics", code: "ORTH", floor: 3, beds: 8, occupancy: 37, staff: 4, patients: 3 },
  { id: "6", name: "General Surgery", code: "SURG", floor: 2, beds: 8, occupancy: 75, staff: 7, patients: 6 },
];

function getOccupancyColor(rate: number): string {
  if (rate >= 85) return "text-red-600";
  if (rate >= 70) return "text-amber-600";
  return "text-green-600";
}

export default function DepartmentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
          + Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDepartments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{dept.name}</h2>
                <p className="text-sm text-gray-500">Floor {dept.floor} &middot; Code: {dept.code}</p>
              </div>
              <span className={`text-2xl font-bold ${getOccupancyColor(dept.occupancy)}`}>
                {dept.occupancy}%
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Beds</span>
                <span className="font-medium">{dept.beds}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Current Patients</span>
                <span className="font-medium">{dept.patients}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Staff</span>
                <span className="font-medium">{dept.staff}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${dept.occupancy >= 85 ? "bg-red-500" : dept.occupancy >= 70 ? "bg-amber-500" : "bg-green-500"}`}
                  style={{ width: `${dept.occupancy}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
