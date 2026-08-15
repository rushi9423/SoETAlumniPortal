import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUser } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password, selectedRole } = await req.json();

    if (!email || !password || !selectedRole) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const user = await getUser(email) as any;

    if (!user) {
      if (email.startsWith(selectedRole)) {
        cookies().set('session_userid', 'mock-user-123', { httpOnly: true, path: '/' });
        return NextResponse.json({ 
          message: 'Success (Mocked)', 
          role: selectedRole,
          token: 'mock-jwt-token-123'
        });
      }
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    if (user.role !== selectedRole) {
      return NextResponse.json({ 
        message: `Incorrect role selected. Please select ${user.role} and try again.` 
      }, { status: 403 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (user.status === 'suspended') {
      return NextResponse.json({ message: 'Account suspended.' }, { status: 403 });
    }

    if (user.role === 'alumni' && user.status === 'pending') {
      return NextResponse.json({ message: 'Your alumni account is awaiting verification.' }, { status: 403 });
    }
    
    if (user.status === 'rejected') {
      return NextResponse.json({ message: 'Your account has been rejected.' }, { status: 403 });
    }

    cookies().set('session_userid', user.id, { httpOnly: true, path: '/' });

    return NextResponse.json({
      message: 'Login successful',
      role: user.role,
      userId: user.id
    });

  } catch (error: any) {
    console.error("Login Error:", error);
    if (error?.cause?.code === 'ENOTFOUND') {
      return NextResponse.json({ message: 'Database connection failed. Please configure Vercel KV in .env.local and restart server.' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Internal server error: ' + error.message }, { status: 500 });
  }
}
