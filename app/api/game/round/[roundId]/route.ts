import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { roundId: string } }
) {
  try {
    const res = await axiosInstance.post(
      `${axiosInstance.defaults.baseURL}${API_URL_CONFIG.GAME.SUBMIT_ANSWER}`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch round data' },
      { status: 500 }
    );
  }
}
