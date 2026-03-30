import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Patients" value={128} subtitle="12 admitted today" />
        <Card title="Bed Occupancy" value="73%" subtitle="89 of 122 beds occupied" />
        <Card title="Pending Tasks" value={24} subtitle="5 urgent" />
        <Card title="Staff on Duty" value={42} subtitle="Across 6 departments" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Admissions</h2>
          <p className="text-sm text-gray-500">
            Patient admission feed will appear here. Connect to the API to see live data.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Urgent Tasks</h2>
          <p className="text-sm text-gray-500">
            Urgent and escalated tasks will appear here. Connect to the API to see live data.
          </p>
        </Card>
      </div>
    </div>
  );
}
