import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const RoomButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${colors.etc.white};
  padding: 13px 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
`;

export const RoomButtonHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const RoomButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 24px;
  gap: 6px;
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
