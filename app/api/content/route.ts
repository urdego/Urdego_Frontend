import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const userId = request.headers.get('User-Id');

  try {
    const res = await axiosInstance.post(
      `${API_URL_CONFIG.CONTENT.DEFAULT}/${userId}/multiple`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = request.headers.get('User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const res = await axiosInstance.get(
      `${API_URL_CONFIG.CONTENT.DEFAULT}/${userId}/contents`,
      {
        params: Object.fromEntries(searchParams),
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

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const contentId = searchParams.get('contentId');
  const userId = request.headers.get('User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const res = await axiosInstance.delete(
      `${API_URL_CONFIG.CONTENT.DEFAULT}/${userId}/content/${contentId}`
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
