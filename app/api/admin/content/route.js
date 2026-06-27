import { NextResponse } from 'next/server';
import { getContent, saveContent, getMessages } from '@/lib/blob';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const decoded = verifyToken(req);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getContent();
    const messages = await getMessages();
    return NextResponse.json({ data, messages });
  } catch (error) {
    console.error('Admin GET content error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin data', details: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const decoded = verifyToken(req);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    await saveContent(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save content error:', error);
    return NextResponse.json({ error: 'Failed to save content', details: error.message }, { status: 500 });
  }
}
