'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState, useEffect } from 'react';

export default function AdminVerifyPage() {
  const [pendingAlumni, setPendingAlumni] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch('/api/admin/verify');
        if (res.ok) {
          const data = await res.json();
          setPendingAlumni(data);
        }
      } catch (err) {
        console.error('Failed to fetch pending alumni', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const handleVerify = async (id: string) => {
    setPendingAlumni(prev => prev.filter(a => a.id !== id));
    try {
      await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'active' })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    setPendingAlumni(prev => prev.filter(a => a.id !== id));
    try {
      await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'rejected' })
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Admin</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Verify Alumni</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Alumni</h1>
      <p className="text-gray-500 mb-8">Review and approve pending alumni registration requests.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600 text-sm">Name</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Company & Role</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Batch</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-gray-500 font-medium">
                  Loading...
                </td>
              </tr>
            ) : pendingAlumni.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-gray-500 font-medium">
                  No pending alumni verifications in the queue.
                </td>
              </tr>
            ) : (
              pendingAlumni.map(alumni => (
                <tr key={alumni.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{alumni.profile?.fullName || 'Unknown'}</div>
                    <div className="text-xs text-gray-500">{alumni.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-800">{alumni.profile?.company || 'N/A'}</div>
                    <div className="text-xs text-gray-500">Alumni</div>
                  </td>
                  <td className="p-4 text-gray-600 font-medium">{alumni.profile?.batch || 'N/A'}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleVerify(alumni.id)}
                        className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg text-sm font-bold transition"
                      >
                        Verify
                      </button>
                      <button 
                        onClick={() => handleReject(alumni.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold transition"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
