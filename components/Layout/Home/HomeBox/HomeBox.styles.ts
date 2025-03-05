import styled from 'styled-components';
import colors from '@/styles/color/palette';
interface GridItemProps {
  $isSelected: boolean;
}

export const HomeBoxWrapper = styled.div`
  height: 152px;
  background: ${colors.etc.white};
  padding: 12px 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
`;

export const TopWrapper = styled.div`
  width: 100%;
`;

export const UserInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BottomWrapper = styled.div`
  display: flex;
  padding-top: 12px;
  width: 100%;
`;

export const PlaceRegister = styled.button`
  display: flex;
  height: 64px;
  width: calc(50% - 8px);
  margin-right: 16px;
  padding: 8px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  background-color: ${colors.gray[95]};
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
  color: ${colors.purple[50]};
`;

export const CharacterSelect = styled.button`
  display: flex;
  height: 64px;
  width: calc(50% - 8px);
  padding: 8px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  background-color: ${colors.gray[95]};
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
  color: ${colors.purple[50]};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
  justify-content: center;
  margin-left: 10px;
`;

export const GridItem = styled.div<GridItemProps>`
  background-color: ${colors.gray[95]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 108px;
  height: 108px;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    border: 2px solid ${colors.gray[50]};
    background-color: ${colors.gray[95]};
  `}
`;
