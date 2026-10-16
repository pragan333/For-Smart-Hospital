import { StatusBadge } from "@/components/ui/StatusBadge";

// Developer A: Replace with API data
const mockPatients = [
  { id: "1", mrn: "MRN-000001", firstName: "Alice", lastName: "Brown", status: "ADMITTED", department: "Emergency Room" },
  { id: "2", mrn: "MRN-000002", firstName: "Bob", lastName: "Wilson", status: "ADMITTED", department: "ICU" },
  { id: "3", mrn: "MRN-000003", firstName: "Charlie", lastName: "Davis", status: "REGISTERED", department: "Pediatrics" },
  { id: "4", mrn: "MRN-000004", firstName: "Diana", lastName: "Martinez", status: "DISCHARGED", department: "Cardiology" },
];

export default function PatientsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
          + Register Patient
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search patients by name or MRN..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="">All Statuses</option>
          <option value="REGISTERED">Registered</option>
          <option value="ADMITTED">Admitted</option>
          <option value="DISCHARGED">Discharged</option>
        </select>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MRN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{patient.mrn}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.firstName} {patient.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.department}</td>
                <td className="px-6 py-4"><StatusBadge status={patient.status} /></td>
                <td className="px-6 py-4">
                  <button className="text-primary-600 text-sm hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
