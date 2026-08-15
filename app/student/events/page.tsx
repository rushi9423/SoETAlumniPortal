'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function EventsPage() {
  const events = [
    { title: 'SOET Alumni Meetup 2026', date: 'August 12, 2026', location: 'Main Auditorium', updatedBy: 'Admin' },
    { title: 'Resume & Interview Workshop', date: 'July 28, 2026', location: 'Online - Teams', updatedBy: 'Admin' }
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Home</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Events</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.date} • {event.location}</p>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">Updated by {event.updatedBy}</span>
              <button className="text-blue-600 font-medium hover:underline">Register</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
