'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  const pendingAlumni = [
    { id: 1, name: 'Sneha Patel', company: 'Microsoft', batch: '2023' },
    { id: 2, name: 'Rahul Verma', company: 'Google', batch: '2022' }
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Admin</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Dashboard</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Verification, user management, and portal analytics.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Pending verify', value: pendingAlumni.length, note: 'Alumni awaiting review', color: 'text-orange-600' },
          { label: 'Students', value: '3,680', note: 'Registered students', color: 'text-blue-600' },
          { label: 'Alumni', value: '1,240', note: 'Verified alumni', color: 'text-green-600' },
          { label: 'Open jobs', value: '86', note: 'Active listings', color: 'text-purple-600' }
        ].map(s => (
          <div key={s.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="text-gray-500 font-medium mb-2">{s.label}</div>
            <div className={`text-4xl font-black mb-2 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Verify Alumni Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Verify alumni</h2>
            <Link href="/admin/verify" className="text-blue-600 text-sm font-semibold hover:underline">Open queue</Link>
          </div>
          
          <div className="space-y-4">
            {pendingAlumni.map(p => (
              <div key={p.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <div className="font-bold text-gray-900">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.company} · Batch {p.batch}</div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-1.5 rounded-lg text-sm font-bold transition">Verify</button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-bold transition">Reject</button>
                </div>
              </div>
            ))}
            {pendingAlumni.length === 0 && <p className="text-gray-500 text-sm">No pending verifications.</p>}
          </div>
        </div>

        {/* Analytics Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Registrations Overview</h2>
          <div className="h-48 flex items-end justify-between gap-2 border-b border-gray-100 pb-2">
            {[40, 55, 48, 70, 82, 76].map((v, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group" style={{ height: `${v}%` }}>
                <div className="absolute inset-0 bg-blue-600 rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-semibold text-gray-400">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick links</h2>
          <div className="space-y-3">
            <Link href="/admin/students" className="block w-full text-center bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">Manage students</Link>
            <Link href="/admin/alumni" className="block w-full text-center bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">Manage alumni</Link>
            <Link href="/admin/reports" className="block w-full text-center bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">Reports & analytics</Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <p className="text-sm text-gray-700 font-medium">Alumni verification requested — Sneha Patel</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <p className="text-sm text-gray-700 font-medium">New job listing — Microsoft SDE</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <p className="text-sm text-gray-700 font-medium">Event capacity 70% — Resume Workshop</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
