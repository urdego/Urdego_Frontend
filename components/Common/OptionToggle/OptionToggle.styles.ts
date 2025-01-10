import styled from 'styled-components';
import colors from '@styles/color/palette';

export const OptionToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 100%;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OptionToggleLabel = styled.span`
  font-size: 14px;
`;

export const Toggle = styled.button<{ $isOn: boolean }>`
  border: none;
  outline: none;
  position: relative;
  width: 48px;
  height: 28px;
  border-radius: 14px;
  background-color: ${({ $isOn }) =>
    $isOn ? colors.purple[50] : colors.gray[80]};
  transition: background-color 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $isOn }) => ($isOn ? '24px' : '2px')};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${colors.etc.white};
    transition: left 0.2s;
  }
`;
