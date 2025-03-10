import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const LocationRegisterWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentHeader = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  padding: 8px 0;
`;

export const ButtonLayout = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  width: 100%;
  min-width: 340px;
  max-width: 430px;
  margin: 0 auto;

  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;

  box-shadow: 0px -4px 24px 0px rgba(0, 0, 0, 0.1);
  background: ${colors.etc.white};

  z-index: 999;
`;
