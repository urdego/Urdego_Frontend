import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await axiosInstance.get(API_URL_CONFIG.GAME.WAITING_ROOM_LIST);
    return NextResponse.json(res.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
