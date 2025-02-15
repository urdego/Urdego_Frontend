import { NextResponse } from 'next/server';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, roomName, maxPlayers, totalRounds } = body;

    if (
      !userId ||
      !roomName ||
      maxPlayers === undefined ||
      totalRounds === undefined
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('방 생성 요청 데이터:', body);
    console.log('요청 엔드포인트:', API_URL_CONFIG.GAME.CREATE_ROOM);

    const response = await axiosInstance.post(
      API_URL_CONFIG.GAME.CREATE_ROOM,
      {
        userId,
        roomName,
        maxPlayers,
        totalRounds,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('방 생성 응답 데이터:', response.data);

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('방 생성 오류:', error.response?.data || error.message);

      return NextResponse.json(
        {
          error: '방 생성에 실패했습니다.',
          details: error.response?.data?.message || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }

    console.error('알 수 없는 오류:', error);
    return NextResponse.json(
      { error: '방 생성 중 예상치 못한 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
