import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const KAKAO_UNLINK_URI = 'https://kapi.kakao.com/v1/user/unlink';
const APPLE_UNLINK_URI = 'https://appleid.apple.com/auth/revoke';

export async function POST(req: NextRequest) {
  try {
    // 1. 현재 세션의 토큰 가져오기
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: '인증 필요' }, { status: 401 });
    }

    // 요청 바디에서 탈퇴 사유 가져오기
    const { userId, withDrawalReason } = await req.json();

    // 1. 소셜 로그인 연결 해제
    if (token.provider === 'kakao') {
      const kakaoResponse = await fetch(KAKAO_UNLINK_URI, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.accessToken}` },
      });
      if (!kakaoResponse.ok) {
        throw new Error('카카오 연결 해제 실패');
      }
    } else if (token.provider === 'apple') {
      const appleResponse = await fetch(APPLE_UNLINK_URI, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.accessToken}` },
      });
      if (!appleResponse.ok) {
        throw new Error('애플 연결 해제 실패');
      }
    }

    // 2. 백엔드 회원 정보 삭제
    const withdrawResponse = await fetch(
      `${process.env.API_URL}/api/user-service/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify({ withDrawalReason }),
      }
    );

    if (!withdrawResponse.ok) {
      throw new Error('회원 정보 삭제 실패');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('회원 탈퇴 처리 중 에러:', error);
    return NextResponse.json({ error: '회원 탈퇴 처리 실패' }, { status: 500 });
  }
}
