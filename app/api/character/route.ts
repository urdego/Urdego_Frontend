import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

interface UserResponse {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  platformId: string;
  platformType: 'KAKAO';
  characterType: string;
  exp: number;
  role: string;
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('User-Id');

    if (!userId) {
      return NextResponse.json(
        { error: '유저 ID를 찾을 수 없습니다.' },
        { status: 401 }
      );
    }

    const response = await axiosInstance.get<UserResponse>(
      `${API_URL_CONFIG.USER_SERVICE.USERS}/${userId}`
    );

    return NextResponse.json({
      characterType: response.data.characterType,
      exp: response.data.exp,
    });
  } catch (error) {
    console.error('유저 정보 조회 에러:', error);
    return NextResponse.json(
      { error: '유저 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { characterName } = await request.json();
    const userId = request.headers.get('User-Id');

    if (!userId) {
      return NextResponse.json(
        { error: '유저 ID를 찾을 수 없습니다.' },
        { status: 401 }
      );
    }

    const response = await axiosInstance.post(
      `${API_URL_CONFIG.USER_SERVICE.CHARACTER}/${userId}`,
      { characterName },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('캐릭터 전송 에러:', error);
    return NextResponse.json(
      { error: '변경된 캐릭터 정보를 전송하는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
