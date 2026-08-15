'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Call the auth API endpoint (which we will build)
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, selectedRole: role }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.role === 'student') router.push('/student');
      else if (data.role === 'alumni') router.push('/alumni');
      else if (data.role === 'admin') router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.message || 'Incorrect role selected or invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">SOET ALUMNI PORTAL</h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">Welcome Back!</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="border rounded-lg p-4 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Role</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input type="radio" name="role" value="student" checked={role === 'student'} onChange={(e) => setRole(e.target.value)} className="text-indigo-600" />
                <span className="text-gray-800">🎓 Student</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input type="radio" name="role" value="alumni" checked={role === 'alumni'} onChange={(e) => setRole(e.target.value)} className="text-indigo-600" />
                <span className="text-gray-800">👨💼 Alumni</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={(e) => setRole(e.target.value)} className="text-indigo-600" />
                <span className="text-gray-800">🔐 Administrator</span>
              </label>
            </div>
          </div>

          <div>
            <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white placeholder-gray-500" />
          </div>

          <div>
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white placeholder-gray-500" />
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-200">
            LOGIN
          </button>
        </form>

        <div className="mt-6 text-center flex flex-col space-y-2">
          <a href="#" className="text-indigo-600 hover:underline text-sm">Forgot Password?</a>
          <div className="text-sm text-gray-600 mt-4">
            Don't have an account? 
            <span className="ml-2 space-x-2">
              <a href="/register/student" className="text-indigo-600 hover:underline">Register as Student</a>
              <span>|</span>
              <a href="/register/alumni" className="text-indigo-600 hover:underline">Register as Alumni</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
