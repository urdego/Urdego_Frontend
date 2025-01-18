import { NextRequest, NextResponse } from 'next/server';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const response = await axiosInstance.post(
      `${API_URL_CONFIG.AUTH.NICKNAME}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Nickname check error:', error);
    return NextResponse.json(
      { error: 'Failed to check nickname' },
      { status: 500 }
    );
  }
}
