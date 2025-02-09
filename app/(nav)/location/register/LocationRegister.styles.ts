import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const PlaceRegisterWrapper = styled.div``;

export const PlaceLayout = styled.div``;

export const BottomLayout = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: 375px;
  max-width: 430px;

  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
`;

export const LottieLayout = styled.div`
  width: 100%;
  min-width: 74px;
  max-width: 74px;

  margin-right: 16px;
  margin-left: auto;

  cursor: pointer;
`;

export const ModalLayout = styled.div`
  padding: 12px 16px;
`;

export const ButtonLayout = styled.div`
  width: 100%;
  min-width: 375px;
  max-width: 430px;

  padding: 12px 16px;

  box-shadow: 0px -4px 24px 0px rgba(0, 0, 0, 0.1);
  background: ${colors.etc.white};

  z-index: 10;
`;
