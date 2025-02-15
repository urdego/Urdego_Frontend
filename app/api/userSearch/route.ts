// app/api/userSearch/route.ts

import { NextResponse } from 'next/server';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';

export async function GET(req: Request) {
  try {
    // 요청 URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');

    if (!word) {
      return NextResponse.json(
        { error: 'Missing "word" query parameter' },
        { status: 400 }
      );
    }

    // user-service의 검색 API 호출
    const response = await axiosInstance.get(
      `${API_URL_CONFIG.USER_SERVICE.USERS}/search/word`,
      {
        params: {
          word,
        },
      }
    );

    // 응답 데이터를 구조 분해
    const data = response.data;
    console.log('검색 결과:', data);

    // 검색 결과 반환
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user search data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user search data' },
      { status: 500 }
    );
  }
}
