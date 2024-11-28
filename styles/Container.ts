'use client';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* min-height: calc(var(--vh, 1vh) * 100); */
  min-width: 375px;
  max-width: 430px;
  min-height: 812px;
  background-color: #ffffff; /* 배경색 */
  color: black; /* 텍스트 색상 */
  display: flex;
  justify-content: center;
  margin: 0 auto; /* 화면 가운데 정렬 */
  /* padding-bottom: 80px; */
  overflow-x: hidden;
`;

export default Container;
