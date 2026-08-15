import { NextResponse } from 'next/server';
import { getPendingAlumni, updateUserStatus } from '@/lib/db';

export async function GET() {
  try {
    const pending = await getPendingAlumni();
    return NextResponse.json(pending);
  } catch (e) {
    return NextResponse.json({ message: 'Error fetching pending alumni' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !['active', 'rejected'].includes(status)) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }
    await updateUserStatus(id, status);
    return NextResponse.json({ message: `User status updated to ${status}` });
  } catch (e) {
    return NextResponse.json({ message: 'Error updating user status' }, { status: 500 });
  }
}
