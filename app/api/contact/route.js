import { NextResponse } from 'next/server';
import { getMessages, saveMessages } from '@/lib/blob';

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Semua kolom wajib diisi' }, { status: 400 });
    }

    const messages = await getMessages();
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      is_read: 0,
      created_at: new Date().toISOString()
    };

    messages.push(newMessage);
    await saveMessages(messages);

    return NextResponse.json({ success: true, message: 'Pesan berhasil dikirim' });
  } catch (error) {
    console.error('Contact submit API error:', error);
    return NextResponse.json({ error: 'Gagal mengirim pesan' }, { status: 500 });
  }
}
