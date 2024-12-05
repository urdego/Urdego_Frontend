import styled from 'styled-components';
import GroupGame from '@/styles/Icon/ChannelButton/channel-bg.svg';

interface ChannelProps {
  $title: '그룹 게임' | '랭킹 게임';
}

export const ChannelWrapper = styled.div<ChannelProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  height: ${({ $title }) => ($title === '그룹 게임' ? '8.75rem' : 'auto')};
  background-color: ${({ $title }) =>
    $title === '그룹 게임' ? '#2F3131' : '#767777'};
  background-image: ${({ $title }) =>
    $title === '그룹 게임' ? `url(${GroupGame.src})` : 'none'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px;
  padding: 1.25rem;
`;

export const ChannelTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  line-height: 150%;
  color: #cabeff;
`;
