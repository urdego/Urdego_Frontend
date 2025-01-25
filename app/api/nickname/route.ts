import { NextRequest, NextResponse } from 'next/server';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import useUserStore from '@/stores/useUserStore';

export async function POST(request: NextRequest) {
  try {
    const userStore = useUserStore.getState();
    const userId = userStore.userId; // userStore의 userId 참조
    const requestData = await request.json();
    const newNickname = requestData.newNickname; // RoomTitleInput에서 받은 새 닉네임

    console.log('New nickname:', newNickname);
    console.log('User ID:', userId);

    const response = await axiosInstance.post(
      `${API_URL_CONFIG.AUTH.NICKNAME}/${userId}`,
      {
        newNickname, // JSON 본문에 포함
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // 응답값 출력 (확인용)
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
