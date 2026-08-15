'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { eventService, EventItem } from '@/lib/services/eventService';
import { Calendar, CheckCircle2, XCircle, Trash2, MapPin, Clock, Users } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getAllEventsForAdmin();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleStatusChange = async (eventId: string, status: 'approved' | 'rejected' | 'cancelled') => {
    try {
      await eventService.updateEventStatus(eventId, status);
      loadEvents();
    } catch (err: any) {
      alert(err.message || 'Failed to update event status.');
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventService.deleteEvent(eventId);
      loadEvents();
    } catch (err: any) {
      alert(err.message || 'Failed to delete event.');
    }
  };

  const filteredEvents = events.filter((e) => (filter === 'all' ? true : e.status === filter));

  return (
    <DashboardLayout>
      {/* Breadcrumbs */}
      <div className="flex items-center text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider">
        <span>Administration</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-blue-600">Event Approvals & Moderation</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Event Moderation Console</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review, approve, or cancel campus events and meetups created by alumni.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
              filter === tab
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab} ({events.filter((e) => (tab === 'all' ? true : e.status === tab)).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">Loading all events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Events in this Category</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{event.title}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> {new Date(event.event_date).toLocaleDateString()} {event.start_time ? `• ${event.start_time}` : ''}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {event.location}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${
                    event.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                    event.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {event.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 my-3 bg-slate-50 p-3 rounded-xl leading-relaxed">
                  {event.description}
                </p>

                <div className="text-[11px] text-slate-400">
                  Organizer: <span className="font-semibold text-slate-700">{event.creator_name || 'Alumni'}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>

                <div className="flex items-center gap-2">
                  {event.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(event.id, 'approved')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  {event.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(event.id, 'rejected')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
