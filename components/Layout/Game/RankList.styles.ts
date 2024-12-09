import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const Container = styled.div`
  width: 100%;
  padding-top: 6px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 24px 16px 24px;
`;

export const Button = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 8px 20px;
  background-color: ${({ $active }) =>
    $active ? colors.purple[50] : 'transparent'};
  color: ${({ $active }) => ($active ? colors.etc.white : colors.gray[70])};
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  font-weight: 700;
  line-height: 150%;
  transition:
    background-color 0.3s,
    color 0.3s;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 16px;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background-color: ${colors.etc.white};
  border-radius: 4px;

  &:nth-child(1) {
    background-color: ${colors.purple[95]};
  }
`;

export const Rank = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.etc.black};
`;

export const Name = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: normal;
  line-height: 150%;
  color: ${colors.etc.black};
`;

export const Score = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.purple[50]};
`;
