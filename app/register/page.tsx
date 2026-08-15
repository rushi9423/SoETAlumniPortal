'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'student' | 'alumni' | 'admin'>('student');
  const [form, setForm] = useState({ name: '', email: '', password: '', branch: 'CSE', batch: '2026', company: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would create the user in the database.
    // For this prototype, we simulate creation and redirect to login.
    setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <nav className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3 font-semibold text-lg">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-600/30">
            SP
          </div>
          SOET Portal
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-600/30">
              SP
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          </div>

          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button 
              type="button" 
              onClick={() => setTab('student')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'student' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Student
            </button>
            <button 
              type="button" 
              onClick={() => setTab('alumni')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'alumni' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Alumni
            </button>
            <button 
              type="button" 
              onClick={() => setTab('admin')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'admin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full name</label>
              <input 
                type="text" 
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input 
                type="email" 
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input 
                type="password" 
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required 
              />
            </div>

            {tab === 'student' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Branch</label>
                  <select 
                    value={form.branch}
                    onChange={e => setForm({...form, branch: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  >
                    <option>CSE</option>
                    <option>IT</option>
                    <option>ECE</option>
                    <option>MECH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Batch</label>
                  <input 
                    type="text" 
                    value={form.batch}
                    onChange={e => setForm({...form, batch: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
            )}
            
            {tab === 'alumni' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Company / Organization</label>
                <input 
                  type="text" 
                  value={form.company}
                  onChange={e => setForm({...form, company: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            )}

            {tab === 'admin' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department / Role</label>
                <input 
                  type="text" 
                  value={form.company}
                  onChange={e => setForm({...form, company: e.target.value})}
                  placeholder="e.g. Dean of Students"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
                <p className="text-xs text-gray-500 mt-1.5">Please use your official @soet.edu email address.</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-50 mt-4"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
