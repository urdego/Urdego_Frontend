import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL, API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fullUrl = `${API_BASE_URL.DNS}${API_URL_CONFIG.GROUP.CREATE}`;

    console.log('Requesting to URL:', fullUrl);

    const response = await axiosInstance({
      method: 'POST',
      url: fullUrl,
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error in makeRoom route:', {
        status: error.response?.status,
        title: error.response?.statusText,
        message: error.message,
        data: error.response?.data,
      });

      return NextResponse.json(
        {
          error: '방 생성에 실패했습니다.',
          details: error.response?.data?.message || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Unknown error:', error);
    return NextResponse.json(
      { error: '방 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}
