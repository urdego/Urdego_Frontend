"use client";
import styled from "styled-components";

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

export default Container;
