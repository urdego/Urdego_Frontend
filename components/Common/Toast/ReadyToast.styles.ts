import styled, { keyframes } from 'styled-components';
import colors from '@/styles/color/palette';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ToastContainer = styled.div`
  display: flex;
  height: 36px;
  align-items: center;
  background: ${colors.etc.white};
  color: ${colors.etc.black};
  font-size: 14px;
  font-weight: 400;
  gap: 6px;
  padding: 4px 20px;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 0.3s ease-out;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${colors.etc.white};
  }
`;

export const IconWrapper = styled.div`
  margin-right: 8px;
`;

export const Message = styled.div`
  flex: 1;
`;
