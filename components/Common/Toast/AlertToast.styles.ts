import styled from 'styled-components';

export const ToastContainer = styled.div`
  background-color: #fffaf2;
  width: 360px;
  bottom: -20px;
  border-radius: 999px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border: 2px solid #ae6b00;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px; // 아이콘 주변 공간 확보
`;

export const Message = styled.p`
  color: #663f00;
  text-align: center;
  display: flex;
  align-items: center;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
  padding: 0 24px;
  height: 100%;
`;
