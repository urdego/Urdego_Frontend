import styled from 'styled-components';
import colors from '@styles/color/palette';

export const ToastContainer = styled.div`
  background: ${colors.etc.white};
  display: flex;
  width: 343px;
  height: 120px;
  padding: 8px 16px 12px 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
`;

export const Message = styled.p`
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  flex: 1 0 0;
  align-self: stretch;
  text-align: center;
  letter-spacing: -0.12px;
  padding: 16px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  width: 100%;
`;

export const RejectButton = styled.button`
  width: 100%;
  border: none;
  background-color: ${colors.gray[80]};
  color: ${colors.etc.white};
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.12px;
`;

export const AcceptButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 6px 12px;
  background: ${colors.purple[50]};
  color: ${colors.etc.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.12px;
`;
