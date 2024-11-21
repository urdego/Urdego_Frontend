import styled from 'styled-components';

interface ChannelProps {
  $height?: 'long' | 'short';
  $background?: 'black' | 'gray';
}

export const ChannelWrapper = styled.div<ChannelProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 21.5rem;
  height: ${({ $height }) => ($height === 'long' ? '8.75rem' : 'auto')};
  background: ${({ $background }) =>
    $background === 'black' ? '#2F3131' : '#767777'};
  border-radius: 12px;
  padding: 1.25rem;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  line-height: 150%;
  color: #cabeff;
`;
