'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AlumniRegistration() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', graduationYear: '', company: '' });
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, role: 'alumni' }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message); // Pending verification message
      router.push('/');
    } else {
      setMsg(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Alumni Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full px-4 py-2 border rounded" onChange={e => setFormData({...formData, fullName: e.target.value})} />
          <input type="email" placeholder="Personal Email" required className="w-full px-4 py-2 border rounded" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded" onChange={e => setFormData({...formData, password: e.target.value})} />
          <input type="number" placeholder="Graduation Year" required className="w-full px-4 py-2 border rounded" onChange={e => setFormData({...formData, graduationYear: e.target.value})} />
          <input type="text" placeholder="Current Company / Designation" required className="w-full px-4 py-2 border rounded" onChange={e => setFormData({...formData, company: e.target.value})} />
          
          {msg && <p className="text-red-500 text-sm">{msg}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700">Submit for Verification</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">Note: Your account will be manually verified by administrators before access is granted.</p>
        <p className="mt-2 text-center text-sm"><a href="/" className="text-indigo-600">Back to Login</a></p>
      </div>
    </div>
  );
}
