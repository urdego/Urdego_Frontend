import { NextRequest, NextResponse } from 'next/server';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import useUserStore from '@/stores/useUserStore';

export async function GET(request: NextRequest) {
  try {
    const userStore = useUserStore.getState();
    const userId = userStore.userId; // userStore의 userId 참조

    console.log('User ID:', userId);
    console.log(`${API_URL_CONFIG.USER_SERVICE.USERS}/${userId}`);

    const response = await axiosInstance.get(
      `${API_URL_CONFIG.USER_SERVICE.USERS}/${userId}`
    );

    const { email, nickname, characterType } = response.data;

    return NextResponse.json({
      email,
      nickname,
      characterType,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
