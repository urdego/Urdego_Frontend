import styled from 'styled-components';

interface ChannelProps {
  $title?: '게임1' | '게임2';
}

export const ChannelWrapper = styled.div<ChannelProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 21.5rem;
  height: ${({ $title }) => ($title === '게임1' ? '8.75rem' : 'auto')};
  background: ${({ $title }) => ($title === '게임1' ? '#2F3131' : '#767777')};
  border-radius: 12px;
  padding: 1.25rem;
`;

export const ChannelTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  line-height: 150%;
  color: #cabeff;
`;
