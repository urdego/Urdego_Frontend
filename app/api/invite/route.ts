import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';

export async function GET(request: NextRequest) {
  try {
    // URL에서 검색어 파라미터 추출
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.get('string');

    if (!queryString) {
      return NextResponse.json(
        { error: '검색어가 필요합니다.' },
        { status: 400 }
      );
    }

    const response = await axiosInstance.get(
      `${API_BASE_URL.DNS}/api/user-service/nickname`,
      {
        params: {
          string: queryString,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Search response:', response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Search error in API route:', error);
    return NextResponse.json(
      { error: '사용자 검색에 실패했습니다.' },
      { status: 500 }
    );
  }
}
