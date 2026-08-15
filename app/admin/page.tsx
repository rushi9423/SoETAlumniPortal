export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-b-4 border-red-500">Alumni Verification</div>
        <div className="bg-white p-6 rounded-lg shadow border-b-4 border-red-500">Job Approvals</div>
        <div className="bg-white p-6 rounded-lg shadow border-b-4 border-red-500">Event Approvals</div>
        <div className="bg-white p-6 rounded-lg shadow">Manage Students</div>
        <div className="bg-white p-6 rounded-lg shadow">Manage Alumni</div>
        <div className="bg-white p-6 rounded-lg shadow">Announcements</div>
        <div className="bg-white p-6 rounded-lg shadow col-span-1 md:col-span-3 text-center bg-gray-800 text-white">Analytics & Reports</div>
      </div>
    </div>
  );
}
