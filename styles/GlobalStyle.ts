"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Pretendard", sans-serif;
    background-color: #e0e0e0;
    color: #ffffff;
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
  }
`;

export default GlobalStyle;
