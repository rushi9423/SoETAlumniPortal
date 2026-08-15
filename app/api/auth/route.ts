import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password, selectedRole } = await req.json();

    if (!email || !password || !selectedRole) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Attempt to find the user in Vercel KV
    const user = await getUser(email) as any;

    if (!user) {
      // For demonstration if KV is empty, mock a successful login if the role matches the email prefix
      // e.g. student@soet.edu -> student, admin@soet.edu -> admin
      if (email.startsWith(selectedRole)) {
        return NextResponse.json({ 
          message: 'Success (Mocked)', 
          role: selectedRole,
          token: 'mock-jwt-token-123'
        });
      }
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    // IMPORTANT: Check Actual Role against Selected Role
    if (user.role !== selectedRole) {
      return NextResponse.json({ 
        message: `Incorrect role selected. Please select ${user.role} and try again.` 
      }, { status: 403 });
    }

    // Verify Password (in a real app, use bcrypt)
    if (user.password !== password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Check account status
    if (user.status === 'suspended') {
      return NextResponse.json({ message: 'Account suspended.' }, { status: 403 });
    }

    if (user.role === 'alumni' && user.status === 'pending') {
      return NextResponse.json({ message: 'Your alumni account is awaiting verification.' }, { status: 403 });
    }

    // Success
    return NextResponse.json({
      message: 'Login successful',
      role: user.role,
      token: 'mock-jwt-token-123',
      userId: user.id
    });

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
