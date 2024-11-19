import StyledComponentsRegistry from "@/lib/registry";
import { ReactNode } from "react";
import { Metadata } from "next";

import Container from "@/styles/Container";
import GlobalStyle from "@/styles/GlobalStyle";

export const metadata: Metadata = {
  title: {
    template: "%s | Urdego?!",
    default: "Urdego?!",
  },
  description: "Where am I? Urdego!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Container>{children}</Container>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
