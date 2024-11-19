"use client";

import { ReactNode } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Pretendard", sans-serif;
    background-color: #c7c7c7;
    color: #ffffff;
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh; /* 전체 화면 높이 */
  max-width: 375px; /* 고정된 화면 너비 */
  max-height: 812px; /* 고정된 화면 높이 */
  background-color: #ffffff; /* 배경색 */
  color: black; /* 텍스트 색상 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; /* 화면 가운데 정렬 */
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body>
        <GlobalStyle />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
