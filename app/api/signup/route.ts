import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

const PORT = 8081;
const SIGNUP_POST_URL = '/api/user-service/users';

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const res = await axiosInstance.post(
      `${axiosInstance.defaults.baseURL}:${PORT}${SIGNUP_POST_URL}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
