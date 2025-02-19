import styled from 'styled-components';

export const InviteToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 280px;
`;

export const InviteMessage = styled.p`
  font-size: 14px;
  color: #374151;
  margin: 0;
`;

export const InviteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 12px;
  gap: 8px;
`;

export const InviteButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: #ffffff;

  &:first-child {
    background-color: #2563eb; /* 파란색 - 수락 */
  }

  &:last-child {
    background-color: #dc2626; /* 빨간색 - 거절 */
  }
`;
