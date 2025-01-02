import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    // file 객체를 Buffer로 변환
    const buffer = Buffer.from(await file.arrayBuffer());

    // 가로/세로에 따른 옵션 설정
    const metadata = await sharp(buffer).rotate().metadata();
    let resizeOptions = {};
    if (metadata.width && metadata.height) {
      if (metadata.width > metadata.height) {
        // 가로가 세로보다 길 경우
        resizeOptions = { width: 800, withoutEnlargement: true };
      } else {
        // 세로가 가로보다 길 경우
        resizeOptions = { height: 800, withoutEnlargement: true };
      }
    }

    // Sharp로 이미지 압축
    const compressedBuffer = await sharp(buffer)
      .rotate()
      .resize(resizeOptions)
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
