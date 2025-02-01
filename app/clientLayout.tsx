'use client';

import { ReactNode, useEffect } from 'react';
import Container from '@/styles/Container';
import GlobalStyle from '@/styles/GlobalStyle';
import { Toaster } from 'react-hot-toast';
import colors from '@styles/color/palette';
import SessionWrapper from '@/components/Layout/Login/SessionWrapper';
import useUserStore from '@/stores/useUserStore';

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { setUserId, setNickname } = useUserStore();

  useEffect(() => {
    const cookies = document.cookie.split(';').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      },
      {} as { [key: string]: string }
    );

    const userId = cookies['User-Id'];
    const encodedNickname = cookies['Nickname'];

    if (userId) setUserId(Number(userId));
    if (encodedNickname) {
      const decodedNickname = decodeURIComponent(encodedNickname);
      setNickname(decodedNickname);
    }
  }, [setUserId, setNickname]);

  return (
    <SessionWrapper>
      <GlobalStyle />
      <Container>{children}</Container>
      <Toaster
        position="bottom-center"
        containerStyle={{
          bottom: 80,
        }}
        toastOptions={{
          error: {
            duration: 2000,
            style: {
              background: colors.etc.white,
              color: colors.etc.black,
              fontSize: '14px',
              padding: '12px 20px',
              borderRadius: '4px',
              maxWidth: '280px',
            },
          },
        }}
      />
    </SessionWrapper>
  );
}
