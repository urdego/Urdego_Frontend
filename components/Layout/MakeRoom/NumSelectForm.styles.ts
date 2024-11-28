import styled, { keyframes } from 'styled-components';
import colors from '@/styles/color/palette';

const buttonScale = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  width: 100%;
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  height: 48px;
  display: flex;
  align-items: center;
  color: ${colors.etc.black};
`;

export const ControlsContainer = styled.div`
  padding: 0 8px;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
`;

export const Number = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.etc.black};
  min-width: 16px;
  text-align: center;
  display: inline-block;
`;

export const IconButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:disabled):active {
    animation: ${buttonScale} 0.2s ease;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
