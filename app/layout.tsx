import StyledComponentsRegistry from '@/lib/registry';
import { ReactNode } from 'react';
import { metadata, viewport } from '@/app/metadata';
import ClientLayout from './clientLayout';

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
          <ClientLayout>{children}</ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
