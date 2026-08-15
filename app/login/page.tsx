'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState('aarav.mehta@soet.edu');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        body: JSON.stringify({ email }),
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

  const setDemo = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('demo1234');
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
          
          <p className="text-gray-500 text-sm mb-6">Use a demo account below to access the platform.</p>

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
              <p className="text-xs text-gray-500 mt-1.5">Any password works in this demo.</p>
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

          <div className="relative flex items-center py-4 mb-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">Quick demo logins</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="space-y-3">
            <button type="button" onClick={() => setDemo('aarav.mehta@soet.edu')} className="w-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition">
              Student · Aarav Mehta
            </button>
            <button type="button" onClick={() => setDemo('priya.sharma@alumni.edu')} className="w-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition">
              Alumni · Priya Sharma
            </button>
            <button type="button" onClick={() => setDemo('admin@soet.edu')} className="w-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition">
              Admin · Dr. R. Kapoor
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            New here? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
