import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nickname = 'min';

  try {
    const res = await axiosInstance.get(
      `${axiosInstance.defaults.baseURL}${API_URL_CONFIG.CONTENT.DEFAULT}${nickname}/contents`,
      {
        params: Object.entries(searchParams),
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
