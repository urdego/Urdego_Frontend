'use client';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const GlobalStyle = createGlobalStyle`
${reset}
*, 
  *::before, 
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Pretendard", sans-serif;
    background-color: #e0e0e0;
    color: rgba(26, 28, 28, 1);
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none; 
    color: inherit;
  }
`;

export default GlobalStyle;
