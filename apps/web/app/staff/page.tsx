import { StatusBadge } from "@/components/ui/StatusBadge";

// Developer C: Replace with API data
const mockStaff = [
  { id: "1", name: "Dr. John Smith", role: "DOCTOR", department: "Emergency Room", specialization: "Emergency Medicine", onDuty: true },
  { id: "2", name: "Dr. Sarah Jones", role: "DOCTOR", department: "Cardiology", specialization: "Cardiology", onDuty: true },
  { id: "3", name: "Dr. Raj Patel", role: "DOCTOR", department: "Pediatrics", specialization: "Pediatrics", onDuty: false },
  { id: "4", name: "Emily Johnson", role: "NURSE", department: "Emergency Room", specialization: null, onDuty: true },
  { id: "5", name: "Maria Williams", role: "NURSE", department: "ICU", specialization: null, onDuty: true },
  { id: "6", name: "Ana Garcia", role: "NURSE", department: "Cardiology", specialization: null, onDuty: false },
];

export default function StaffPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Directory</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
          + Add Staff
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="">All Roles</option>
          <option value="DOCTOR">Doctor</option>
          <option value="NURSE">Nurse</option>
          <option value="TECHNICIAN">Technician</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="">All Departments</option>
          <option value="er">Emergency Room</option>
          <option value="icu">ICU</option>
          <option value="cardiology">Cardiology</option>
        </select>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStaff.map((staff) => (
          <div key={staff.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{staff.department}</p>
                {staff.specialization && (
                  <p className="text-xs text-gray-400 mt-0.5">{staff.specialization}</p>
                )}
              </div>
              <StatusBadge status={staff.role} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${staff.onDuty ? "text-green-600" : "text-gray-400"}`}>
                <span className={`w-2 h-2 rounded-full ${staff.onDuty ? "bg-green-400" : "bg-gray-300"}`} />
                {staff.onDuty ? "On Duty" : "Off Duty"}
              </span>
              <button className="text-primary-600 text-sm hover:underline">View Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
