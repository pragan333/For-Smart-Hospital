import { StatusBadge } from "@/components/ui/StatusBadge";

// Developer B: Replace with API data
const mockTasks = [
  { id: "1", title: "Blood test for patient MRN-000001", priority: "HIGH", status: "PENDING", assignee: "Nurse Johnson", department: "ER" },
  { id: "2", title: "Schedule MRI scan", priority: "MEDIUM", status: "IN_PROGRESS", assignee: "Dr. Smith", department: "ER" },
  { id: "3", title: "Prepare discharge papers", priority: "LOW", status: "COMPLETED", assignee: "Nurse Garcia", department: "Cardiology" },
  { id: "4", title: "Emergency surgery prep", priority: "URGENT", status: "ESCALATED", assignee: "Dr. Jones", department: "Surgery" },
  { id: "5", title: "Medication round - Ward A", priority: "HIGH", status: "PENDING", assignee: "Nurse Williams", department: "ICU" },
];

export default function TasksPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
          + Create Task
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 mb-6">
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ESCALATED">Escalated</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="">All Priorities</option>
          <option value="URGENT">Urgent</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {mockTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <StatusBadge status={task.priority} />
              </div>
              <p className="text-sm text-gray-500">
                Assigned to {task.assignee} &middot; {task.department}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={task.status} />
              <button className="text-primary-600 text-sm hover:underline">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
