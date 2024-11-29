import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const PlaceRegisterWrapper = styled.div``;

export const PlaceLayout = styled.div``;

export const ButtonLayout = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: 375px;
  max-width: 430px;
  margin: 0 auto;

  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;

  box-shadow: 0px -4px 24px 0px rgba(0, 0, 0, 0.1);
  background: ${colors.etc.white};

  box-sizing: border-box;
`;
