import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';
import useUserStore from '@/stores/useUserStore';

export async function GET(request: NextRequest) {
  const userId = useUserStore.getState().userId;

  try {
    const res = await axiosInstance.get(`${API_URL_CONFIG.GAME.LEVEL_UPDATE}`, {
      params: { userId },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update level' },
      { status: 500 }
    );
  }
}
