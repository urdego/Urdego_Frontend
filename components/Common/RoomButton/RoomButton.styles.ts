import styled from 'styled-components';
import colors from '@/styles/color/palette';
import { StaticImageData } from 'next/image';

export const RoomButtonWrapper = styled.div<{
  $hostCharacter: StaticImageData;
}>`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  background-color: ${colors.etc.white};
  background-image: url(${(props) => props.$hostCharacter.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 60px 10px;
  padding: 12px 12px 16px 12px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
`;

export const RoomButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 24px;

  gap: 4px;
`;

export const Round = styled.div<{ $round: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  border-radius: 4px;

  color: ${colors.etc.white};
  background-color: ${(props) =>
    props.$round === 3
      ? '#AE6B00'
      : props.$round === 2
        ? '#42C700'
        : '#FFBF00'};
  backdrop-filter: blur(2px);
`;

export const Participant = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3.5px;
  width: 44px;

  color: ${colors.etc.white};
  border-radius: 4px;
  background: rgba(118, 119, 119, 0.5);
  backdrop-filter: blur(2px);

  padding-left: 7.5px;
  padding-right: 6px;
`;
