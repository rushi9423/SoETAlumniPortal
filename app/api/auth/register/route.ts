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
    
    // Status logic: Students are active immediately. Alumni are pending. Admin can't be registered publicly.
    if (role === 'admin') {
      return NextResponse.json({ message: 'Cannot register as admin' }, { status: 403 });
    }

    const status = role === 'alumni' ? 'pending' : 'active';

    const user = await createUser(id, email, role, password, status);
    
    // Store profile data
    import('@/lib/db').then(({ createProfile }) => {
       createProfile(id, { fullName, ...additionalData });
    });

    return NextResponse.json({
      message: role === 'alumni' 
        ? 'Registration successful. Your account is pending verification.' 
        : 'Registration successful',
      user: { id, email, role, status }
    });
  } catch (error) {
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  }
}
