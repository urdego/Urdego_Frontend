import styled from 'styled-components';
import colors from '@/styles/color/palette';

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
  gap: 16px;
  padding-top: 12px;
`;

export const PlaceRegister = styled.button`
  display: flex;
  height: 64px;
  width: 100%;
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
  width: 100%;
  height: 64px;
  padding: 8px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  border: none;
  background-color: ${colors.gray[95]};
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
  color: ${colors.purple[50]};
`;
