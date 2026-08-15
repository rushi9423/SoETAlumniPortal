import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';

export async function POST(req: Request) {
  try {
    const userId = (await cookies()).get('session_userid')?.value;
    
    if (!userId || userId === 'mock-user-123') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { fullName, department, batch } = await req.json();

    const existingProfile: any = await kv.get(`profile:${userId}`) || {};
    
    const updatedProfile = {
      ...existingProfile,
      fullName,
      department,
      batch
    };

    await kv.set(`profile:${userId}`, updatedProfile);

    return NextResponse.json({ message: 'Profile updated', profile: updatedProfile });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
