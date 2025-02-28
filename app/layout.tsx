import StyledComponentsRegistry from '@/lib/registry';
import { ReactNode } from 'react';
import { metadata, viewport } from '@/app/metadata';
import ClientLayout from './clientLayout';

export { metadata, viewport };

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
