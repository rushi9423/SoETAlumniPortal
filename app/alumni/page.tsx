export default function AlumniDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Alumni Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">My Profile</div>
        <div className="bg-white p-6 rounded-lg shadow">Alumni Directory</div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">Post Job</div>
        <div className="bg-white p-6 rounded-lg shadow">My Jobs</div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">Create Event</div>
        <div className="bg-white p-6 rounded-lg shadow">My Events</div>
        <div className="bg-white p-6 rounded-lg shadow">Announcements</div>
      </div>
    </div>
  );
}
