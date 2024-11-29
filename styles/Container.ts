'use client';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 340px;
  max-width: 430px;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: auto;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Container;
