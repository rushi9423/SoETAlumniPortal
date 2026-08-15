'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { Bell, UserCheck, Briefcase } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    { type: 'mentor', text: 'Priya Sharma accepted your mentor request.', time: '12 mins ago', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { type: 'job', text: 'New job match: Frontend Developer at Razorpay.', time: '1 hr ago', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { type: 'system', text: 'Your profile has been updated successfully.', time: '1 day ago', icon: Bell, color: 'text-gray-600', bg: 'bg-gray-100' }
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Home</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Notifications</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
        {notifications.map((n, i) => (
          <div key={i} className="p-4 border-b border-gray-50 flex items-start gap-4 hover:bg-gray-50 transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg}`}>
              <n.icon className={`w-5 h-5 ${n.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">{n.text}</p>
              <p className="text-gray-400 text-xs mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
