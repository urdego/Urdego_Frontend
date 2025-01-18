import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const userId = (await params).userId;

  try {
    const res = await axiosInstance.get(
      `${API_URL_CONFIG.CONTENT.GET}/${userId}/contents`,
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
