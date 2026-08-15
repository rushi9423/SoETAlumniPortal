import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    const userId = cookies().get('session_userid')?.value;
    
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (userId === 'mock-user-123') {
      return NextResponse.json({
        id: 'mock-user-123',
        email: 'mock@student.soet.edu',
        role: 'student',
        profile: {
          fullName: 'Mock User',
          department: 'Computer Science',
          batch: '2026',
        }
      });
    }

    const user: any = await kv.get(`user:${userId}`);
    const profile: any = await kv.get(`profile:${userId}`);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ ...user, profile });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
