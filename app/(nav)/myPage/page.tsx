import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/authOptions';
import MyPageClient from '@/app/(nav)/myPage/MyPageClient';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error('세션이 없습니다. 로그인 페이지로 리다이렉트합니다.');
    redirect('/login');
  }

  const userId = session.user?.userId;
  if (!userId) {
    console.error(
      '세션에 userId가 없습니다. 로그인 페이지로 리다이렉트합니다.'
    );
    redirect('/login');
  }

  try {
    const response = await axiosInstance.get(
      `${API_URL_CONFIG.USER_SERVICE.USERS}/${userId}`
    );

    const { email, nickname, activeCharacter, exp, level } = response.data;

    const userData = {
      email,
      nickname,
      activeCharacter,
      level,
      exp,
    };

    return <MyPageClient userData={userData} />;
  } catch (error) {
    console.error('서버사이드 에러:', error);
    redirect('/error');
  }
}
