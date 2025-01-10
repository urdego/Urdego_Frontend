import { createGlobalStyle } from 'styled-components';
import colors from '@/styles/color/palette';

export const ToastStyles = createGlobalStyle`

.toast {
  display: flex;
  background: ${colors.etc.white};
  color: ${colors.etc.black};
  font-size: 14px;
  font-weight: 400;
  align-items: center; 
  gap: 6px; 
  padding: 4px 20px;
  border-radius: 4px;
  position: relative;
}

  
.toast::after {
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
