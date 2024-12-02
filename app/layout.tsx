import StyledComponentsRegistry from '@/lib/registry';
import { ReactNode } from 'react';
import { metadata, viewport } from '@/app/metadata';
import Container from '@/styles/Container';
import GlobalStyle from '@/styles/GlobalStyle';
import { Toaster } from 'react-hot-toast';
import colors from '@styles/color/palette';
import LoadingSpinnerComponent from '@/components/Common/LoadingSpinner/LoadingSpinner';
import RouteChangeHandler from '@/hooks/Loading/RouteChangeHandler';

export { metadata };
export { viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Container>
            <LoadingSpinnerComponent />
            <RouteChangeHandler />
            {children}
          </Container>
          <Toaster
            position="bottom-center"
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
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
