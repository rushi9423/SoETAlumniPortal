'use client';
import { useRouter } from 'next/navigation';

export default function AlumniDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-700 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Alumni Dashboard</h1>
        <button onClick={handleLogout} className="bg-indigo-800 px-4 py-2 rounded hover:bg-indigo-900 transition-colors">Logout</button>
      </nav>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-indigo-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">My Profile</h2>
            <p className="text-gray-500 text-sm">Update your current role</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Alumni Directory</h2>
            <p className="text-gray-500 text-sm">Find and connect with peers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-green-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Post a Job</h2>
            <p className="text-gray-500 text-sm">Hire from your alma mater</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-purple-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Create Event</h2>
            <p className="text-gray-500 text-sm">Host a webinar or meetup</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">My Job Postings</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700 transition-colors">+ New Job</button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="border-b pb-4 mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-indigo-700">Frontend Developer</h3>
                  <p className="text-gray-600 font-medium">Your Company • Remote</p>
                  <p className="text-xs text-green-600 mt-1 font-bold">● Active (12 Applicants)</p>
                </div>
                <button className="text-indigo-600 hover:underline">View Applicants</button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <h2 className="text-2xl font-bold text-gray-800">My Events</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700 transition-colors">+ New Event</button>
            </div>
             <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 italic">You haven't created any events yet.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-yellow-400">
              <h3 className="font-bold text-gray-800 mb-2">Alumni Meet 2026</h3>
              <p className="text-gray-600 text-sm mb-2">Save the date! Our grand alumni reunion will take place in December.</p>
              <p className="text-xs text-gray-400">Posted 5 days ago by Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
