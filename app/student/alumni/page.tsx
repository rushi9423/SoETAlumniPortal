'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { Search } from 'lucide-react';

export default function AlumniDirectory() {
  const alumni = [
    { name: 'Priya Sharma', company: 'Google', role: 'Software Engineer', batch: '2022' },
    { name: 'Rohan Desai', company: 'Microsoft', role: 'Product Manager', batch: '2020' },
    { name: 'Aditya Patel', company: 'Amazon', role: 'SDE II', batch: '2021' },
    { name: 'Sneha Reddy', company: 'Atlassian', role: 'Frontend Dev', batch: '2023' }
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Home</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Alumni Directory</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Alumni Directory</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, company, or skills..." className="w-full pl-10 pr-4 py-2 border rounded-lg" />
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Search</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumni.map((a, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">
              {a.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-lg font-bold text-gray-900">{a.name}</h3>
            <p className="text-blue-600 text-sm font-medium">{a.role} @ {a.company}</p>
            <p className="text-gray-500 text-sm mt-1">Batch of {a.batch}</p>
            <button className="mt-4 w-full py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Connect</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
