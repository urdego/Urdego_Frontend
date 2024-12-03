import { API_PORT_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { roundId: string } }
) {
  try {
    const res = await axiosInstance.get(
      `${axiosInstance.defaults.baseURL}${API_PORT_CONFIG.GAME}/api/game-service/rounds/${params.roundId}`
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
