import { NextRequest, NextResponse } from 'next/server';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { userId, newNickname } = requestData;

    if (!userId || !newNickname) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('New nickname:', newNickname);
    console.log('User ID:', userId);

    const response = await axiosInstance.post(
      `${API_URL_CONFIG.AUTH.NICKNAME}/${userId}`,
      { newNickname },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Nickname Change Response:', response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Nickname change error:', error);
    return NextResponse.json(
      { error: 'Failed to change nickname' },
      { status: 500 }
    );
  }
}
