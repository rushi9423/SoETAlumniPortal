import { NextResponse } from 'next/server';
import { createUser } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password, fullName, role, ...additionalData } = await req.json();

    if (!email || !password || !fullName || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Assign an ID (simple random string for demonstration, typically UUID)
    const id = Math.random().toString(36).substring(2, 15);
    
    // Status logic: Students and Admins are active immediately. Alumni are pending.

    const status = role === 'alumni' ? 'pending' : 'active';

    const user = await createUser(id, email, role, password, status);
    
    // Store profile data
    const { createProfile } = await import('@/lib/db');
    await createProfile(id, { fullName, ...additionalData });

    return NextResponse.json({
      message: role === 'alumni' 
        ? 'Registration successful. Your account is pending verification.' 
        : 'Registration successful',
      user: { id, email, role, status }
    });
  } catch (error: any) {
    console.error("Register Error:", error);
    if (error?.cause?.code === 'ENOTFOUND') {
      return NextResponse.json({ message: 'Database connection failed. Please configure Vercel KV in .env.local' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Registration failed: ' + error.message }, { status: 500 });
  }
}
