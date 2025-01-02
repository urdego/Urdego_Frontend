import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    // file 객체를 Buffer로 변환
    const buffer = Buffer.from(await file.arrayBuffer());

    // Sharp로 이미지 압축
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .withMetadata()
      .webp({ quality: 80 })
      .toBuffer();

    return new Response(compressedBuffer, {
      headers: {
        'Content-Type': 'image/webp',
      },
    });
  } catch (error) {
    console.error('이미지 처리 중 에러:', error);
    return NextResponse.json({ error: '이미지 처리 실패' }, { status: 500 });
  }
}
