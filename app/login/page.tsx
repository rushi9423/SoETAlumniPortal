'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'alumni' | 'admin'>('student');

  // If already logged in, redirect
  if (user) {
    router.push(`/${user.role}`);
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, selectedRole }),
      });

      if (res.ok) {
        const data = await res.json();
        // Force a hard reload so AuthProvider re-fetches user cookie
        window.location.href = `/${data.role}`;
      } else {
        const err = await res.json();
        setError(err.message || 'Login failed');
      }
    } catch (e) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Navigation */}
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
            <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
          </div>

          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button 
              type="button" 
              onClick={() => setSelectedRole('student')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${selectedRole === 'student' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Student
            </button>
            <button 
              type="button" 
              onClick={() => setSelectedRole('alumni')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${selectedRole === 'alumni' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Alumni
            </button>
            <button 
              type="button" 
              onClick={() => setSelectedRole('admin')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${selectedRole === 'admin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required 
              />
            </div>

            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-50 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>


          <p className="text-center text-sm text-gray-500 mt-8">
            New here? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
