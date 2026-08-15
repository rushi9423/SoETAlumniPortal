'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [pending, setPending] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/verify')
      .then(res => res.json())
      .then(data => setPending(Array.isArray(data) ? data : []));
  }, []);

  const handleVerify = async (id: string, status: 'active' | 'rejected') => {
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    if (res.ok) {
      setPending(pending.filter(p => p.id !== id));
      alert(`User ${status}`);
    }
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-700 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-indigo-800 px-4 py-2 rounded hover:bg-indigo-900 transition-colors">Logout</button>
      </nav>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-b-4 border-indigo-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Alumni Verification</h2>
            <p className="text-3xl font-bold text-indigo-600">{pending.length}</p>
            <p className="text-gray-500">Pending Requests</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-b-4 border-indigo-500">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Job Approvals</h2>
            <p className="text-3xl font-bold text-indigo-600">0</p>
            <p className="text-gray-500">Pending Jobs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-b-4 border-indigo-500">
             <h2 className="text-xl font-bold mb-2 text-gray-800">Event Approvals</h2>
            <p className="text-3xl font-bold text-indigo-600">0</p>
            <p className="text-gray-500">Pending Events</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Alumni Verification</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {pending.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No pending verifications.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 border-b">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Graduation Year</th>
                  <th className="p-4 font-semibold">Company</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{user.profile?.fullName}</td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4 text-gray-600">{user.profile?.graduationYear}</td>
                    <td className="p-4 text-gray-600">{user.profile?.company}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleVerify(user.id, 'active')} className="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600 transition-colors">Approve</button>
                      <button onClick={() => handleVerify(user.id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition-colors">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
