import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

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
      `${API_URL_CONFIG.AUTH.CHARACTER}/${userId}`,
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
