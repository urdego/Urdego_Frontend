import StyledComponentsRegistry from '@/lib/registry';
import { ReactNode } from 'react';
import { metadata } from '@/app/metadata';
import type { Viewport } from 'next';
import ClientLayout from './clientLayout';

export { metadata };

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <ClientLayout>{children}</ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
