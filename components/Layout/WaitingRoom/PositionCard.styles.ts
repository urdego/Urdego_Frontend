import colors from '@styles/color/palette';
import styled, { css } from 'styled-components';
import AddIcon from '@/styles/Icon/Game/Add';

export const Card = styled.div<{ $isEmpty?: boolean; $isDisabled?: boolean }>`
  width: 104px;
  min-height: 172px;
  background-color: ${({ $isEmpty, $isDisabled }) =>
    $isEmpty && $isDisabled
      ? colors.etc.card
      : $isEmpty
        ? colors.etc.emptyCard
        : colors.etc.white};
  border: ${({ $isEmpty }) =>
    $isEmpty ? `2px solid ${colors.etc.white}` : 'none'};
  border-radius: 12px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 12px 16px 0 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  ${({ $isEmpty, $isDisabled }) =>
    $isEmpty &&
    $isDisabled &&
    css`
      pointer-events: none;
    `}

  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    `}
`;

export const Level = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${colors.purple[50]};
  border-radius: 4px;
  background: ${colors.purple[95]};
  height: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 20px;
  margin: 0 auto;
  margin-bottom: 3px;
`;

export const Username = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.12px;
  color: ${colors.gray[50]};
  text-align: center;
`;

export const Character = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    position: absolute;
    right: 0;
    left: -55px;
    width: 260%;
    object-fit: contain;
    transform: translateY(10px);
  }
`;

export const HostLabel = styled.div<{ $isHost?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2px 0;
  color: ${colors.etc.black};
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.2px;
  text-shadow:
    1px 1px 0 #fff,
    -1px 1px 0 #fff,
    1px -1px 0 #fff,
    -1px -1px 0 #fff,
    0px 1px 0 #fff,
    0px -1px 0 #fff,
    -1px 0px 0 #fff,
    1px 0px 0 #fff,
    0px 0px 4px rgba(0, 0, 0, 0.25);
  background: ${({ $isHost }) =>
    $isHost
      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFEF8A 100%)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(155, 212, 152, 0.5) 100%)'};
`;

export const EmptyCardIcon = styled(AddIcon)`
  width: 32px;
  height: 32px;
  color: ${colors.etc.white};
`;
