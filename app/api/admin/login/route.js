import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === 'admin' && password === adminPassword) {
      const token = signToken({ username });
      return NextResponse.json({ token, success: true });
    }

    return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
