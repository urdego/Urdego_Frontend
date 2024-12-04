import { NextRequest, NextResponse } from 'next/server';
import { API_URL_CONFIG, API_BASE_URL } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Receiving login request:', body);

    const response = await axiosInstance.post(
      `${API_BASE_URL.DNS}${API_URL_CONFIG.AUTH.LOGIN}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Login response:', response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Login error in API route:', error);
    return NextResponse.json(
      { error: '로그인에 실패했습니다.' },
      { status: 401 }
    );
  }
}
