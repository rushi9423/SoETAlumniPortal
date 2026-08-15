'use client';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-700 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <button onClick={handleLogout} className="bg-indigo-800 px-4 py-2 rounded hover:bg-indigo-900 transition-colors">Logout</button>
      </nav>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-indigo-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">My Profile</h2>
            <p className="text-gray-500 text-sm">Update your resume and skills</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Alumni Directory</h2>
            <p className="text-gray-500 text-sm">Find and connect with alumni</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-green-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Jobs & Internships</h2>
            <p className="text-gray-500 text-sm">Browse opportunities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-purple-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Events</h2>
            <p className="text-gray-500 text-sm">Register for upcoming events</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Job Postings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-bold text-indigo-700">Software Engineering Intern</h3>
                <p className="text-gray-600 font-medium">Google • Remote</p>
                <div className="mt-2 flex space-x-2">
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">React</span>
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">Next.js</span>
                </div>
                <button className="mt-4 bg-indigo-50 text-indigo-700 px-4 py-2 rounded font-medium hover:bg-indigo-100 transition-colors">Apply Now</button>
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-700">Data Analyst</h3>
                <p className="text-gray-600 font-medium">Amazon • Seattle, WA</p>
                <div className="mt-2 flex space-x-2">
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">SQL</span>
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">Python</span>
                </div>
                <button className="mt-4 bg-indigo-50 text-indigo-700 px-4 py-2 rounded font-medium hover:bg-indigo-100 transition-colors">Apply Now</button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-yellow-400">
              <h3 className="font-bold text-gray-800 mb-2">Upcoming Tech Fair!</h3>
              <p className="text-gray-600 text-sm mb-2">Join us next week for the annual SOET Tech Fair. Top companies will be present.</p>
              <p className="text-xs text-gray-400">Posted 2 days ago by Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
