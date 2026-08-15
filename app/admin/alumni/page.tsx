'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Search } from 'lucide-react';

export default function AdminAlumniPage() {
  const alumni = [
    { id: 1, name: 'Priya Sharma', email: 'priya.sharma@alumni.edu', company: 'Google', role: 'SDE', batch: '2022', status: 'Verified' },
    { id: 2, name: 'Rohan Desai', email: 'rohan.d@amazon.com', company: 'Amazon', role: 'Product Manager', batch: '2020', status: 'Verified' },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Admin</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Manage Alumni</span>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Alumni</h1>
          <p className="text-gray-500">View and manage verified alumni accounts in the network.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 flex gap-4 p-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search alumni by name, company, or batch..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
        </div>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold">Filter</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600 text-sm">Alumnus</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Company & Role</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map(alum => (
              <tr key={alum.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                      {alum.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{alum.name}</div>
                      <div className="text-xs text-gray-500">{alum.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-800">{alum.company}</div>
                  <div className="text-xs text-gray-500">{alum.role} · Batch {alum.batch}</div>
                </td>
                <td className="p-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-green-100 text-green-700">
                    {alum.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-4">Edit Profile</button>
                  <button className="text-red-600 hover:text-red-800 font-medium text-sm">Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
