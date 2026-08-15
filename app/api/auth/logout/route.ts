import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  (await cookies()).delete('session_userid');
  return NextResponse.json({ message: 'Logged out successfully' });
}
