'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/components/AuthProvider';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.profile) {
      setFullName(user.profile.fullName || '');
      setDepartment(user.profile.department || '');
      setBatch(user.profile.batch || '');
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/user/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, department, batch })
      });
      
      if (res.ok) {
        setMessage('Profile updated successfully! Refreshing...');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (e) {
      setMessage('An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Home</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Profile</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Batch / Graduation Year</label>
            <input type="text" value={batch} onChange={e => setBatch(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          
          {message && <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}

          <button disabled={saving} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold w-full hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
