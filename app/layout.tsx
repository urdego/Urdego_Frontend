import StyledComponentsRegistry from "@/lib/registry";
import { ReactNode } from "react";
import { metadata } from "./metadata";
import Container from "@/styles/Container";
import GlobalStyle from "@/styles/GlobalStyle";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Container>{children}</Container>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
