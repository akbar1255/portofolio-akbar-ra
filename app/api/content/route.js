import { NextResponse } from 'next/server';
import { getContent } from '@/lib/blob';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getContent();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch content API error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
