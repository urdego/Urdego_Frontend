import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const params = request.nextUrl.searchParams;

  try {
    const res = await axiosInstance.post(
      '/api/content-service/contents/multiple',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: Object.fromEntries(params),
      }
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
