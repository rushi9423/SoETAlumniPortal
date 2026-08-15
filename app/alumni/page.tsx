'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/components/AuthProvider';
import { Plus, Eye, Users, Briefcase, MessageSquare, Calendar as CalendarIcon, Search } from 'lucide-react';

const MENTOR_REQS = [
  { id: 'm1', student: 'Aarav Mehta', topic: 'SDE interview prep', status: 'Pending' },
  { id: 'm2', student: 'Diya Kapoor', topic: 'Product management path', status: 'Pending' },
  { id: 'm3', student: 'Ishaan Gupta', topic: 'Resume review', status: 'Accepted' },
];

const EVENTS = [
  { id: 'e1', title: 'SOET Alumni Meetup 2026', date: '2026-08-12', time: '10:00 AM', seats: 120, registered: 86 },
  { id: 'e2', title: 'Resume & Interview Workshop', date: '2026-07-28', time: '4:00 PM', seats: 200, registered: 154 },
];

const CHATS = [
  { id: 'c1', name: 'Priya Sharma', role: 'Student · 2026', last: 'Thanks for the guidance!', avatar: 'PS' },
  { id: 'c2', name: 'Rohan Desai', role: 'Student · 2027', last: 'Can we schedule a mock interview?', avatar: 'RD' },
];

export default function AlumniDashboard() {
  const { user } = useAuth();
  const userName = user?.profile?.fullName || 'Alumni User';
  const company = user?.profile?.company || 'Company';
  const batch = user?.profile?.batch || 'Batch';
  const title = (user?.profile as any)?.jobTitle || 'Role';
  
  return (
    <DashboardLayout>
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Alumni</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Dashboard</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{userName}</h1>
          <p className="text-gray-500">{title} • {company} • Batch {batch}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition">
            <Plus className="w-4 h-4" /> Post job
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition">
            <Plus className="w-4 h-4" /> Post internship
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:-translate-y-1 hover:shadow-md transition duration-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
            Profile views <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">128</div>
          <div className="text-xs text-gray-500">Last 30 days</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:-translate-y-1 hover:shadow-md transition duration-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
            Mentor requests <Users className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{MENTOR_REQS.filter(m => m.status === 'Pending').length}</div>
          <div className="text-xs text-gray-500">Awaiting response</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:-translate-y-1 hover:shadow-md transition duration-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
            Jobs posted <Briefcase className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
          <div className="text-xs text-gray-500">Active postings</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:-translate-y-1 hover:shadow-md transition duration-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
            Messages <MessageSquare className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
          <div className="text-xs text-gray-500">Unread messages</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Mentor requests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Mentor requests</h2>
          <div className="space-y-4">
            {MENTOR_REQS.map(m => (
              <div key={m.id} className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{m.student}</div>
                  <div className="text-xs text-gray-500">{m.topic}</div>
                </div>
                {m.status === 'Pending' ? (
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-lg hover:bg-green-200 transition">Accept</button>
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition">Decline</button>
                  </div>
                ) : (
                  <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider rounded-full">{m.status}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your events */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Your events</h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">Manage</button>
          </div>
          <div className="space-y-4">
            {EVENTS.map(e => (
              <div key={e.id} className="flex items-start gap-3">
                <div className="mt-1 bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{e.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{e.registered}/{e.seats} registered • {e.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student messages */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Student messages</h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">Open chat</button>
          </div>
          <div className="space-y-4">
            {CHATS.map(c => (
              <div key={c.id} className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition">{c.name}</div>
                  <div className="text-xs text-gray-500 truncate">{c.last}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement chart mock */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Engagement overview</h2>
          <div className="h-32 flex items-end gap-2 pb-2">
            {[12, 18, 15, 22, 28, 24].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full bg-blue-100 group-hover:bg-blue-600 transition-colors rounded-t-sm" style={{ height: `${(val / 28) * 100}%` }}></div>
                <div className="text-[10px] text-gray-400 font-medium">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
