import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/authOptions';
import MyPageClient from '@/app/(nav)/myPage/MyPageClient';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';

export default async function MyPage() {
  // 서버에서 세션 정보를 가져옴
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error('세션이 없습니다. 로그인 페이지로 리다이렉트합니다.');
    redirect('/login');
  }

  // 세션에서 userId 추출
  const userId = session.user?.userId;
  if (!userId) {
    console.error(
      '세션에 userId가 없습니다. 로그인 페이지로 리다이렉트합니다.'
    );
    redirect('/login');
  }

  try {
    console.log(`서버 컴포넌트에서 userId: ${userId}로 직접 백엔드 API 호출`);
    console.log(`호출 URL: ${API_URL_CONFIG.USER_SERVICE.USERS}/${userId}`);

    // 라우터를 거치지 않고 직접 백엔드 API 호출
    const response = await axiosInstance.get(
      `${API_URL_CONFIG.USER_SERVICE.USERS}/${userId}`
    );

    const { email, nickname, activeCharacter, exp, level } = response.data;
    console.log('서버에서 받아온 userData:', response.data);

    const userData = {
      email,
      nickname,
      activeCharacter,
      level,
      exp,
    };

    // 클라이언트 컴포넌트로 데이터를 전달
    return <MyPageClient userData={userData} />;
  } catch (error) {
    console.error('서버사이드 에러:', error);
    redirect('/error');
  }
}
