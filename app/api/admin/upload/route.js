import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { verifyToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const decoded = verifyToken(req);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }

    const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '_');

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      // Local upload fallback
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);
      
      return NextResponse.json({ url: `/uploads/${filename}` });
    }

    // Vercel Blob upload
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Gagal mengupload file' }, { status: 500 });
  }
}
