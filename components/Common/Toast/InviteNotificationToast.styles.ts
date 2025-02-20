import styled from 'styled-components';

export const InviteToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 300px;
`;

export const InviteMessage = styled.p`
  font-size: 14px;
  color: #1f2937;
  margin: 0;
  font-weight: 500;
`;

export const InviteButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
  gap: 12px;
`;

export const InviteButton = styled.button`
  flex: 1;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 400;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #ffffff;
`;
