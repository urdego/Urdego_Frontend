import styled from 'styled-components';
import colors from '@styles/color/palette';

export const SessionWrapper = styled.div`
  margin: 16px;
`;

export const SubTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const DetailText = styled.p`
  font-size: 12px;
  color: ${colors.gray[60]};
  margin-bottom: 12px;
  line-height: 1.5;
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 375px;
  max-width: 430px;
  padding: 16px;
  background-color: ${colors.etc.white};
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BigCheckboxWrapper = styled.div`
  position: fixed;
  bottom: 90px;
  padding: 0 0 0 16px;
`;

export const TextareaWrapper = styled.div<{
  $isActive: boolean;
  $hasText: boolean;
}>`
  height: 120px;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: ${({ $isActive }) =>
    $isActive ? colors.etc.white : colors.gray[95]};
  border-radius: 4px;
  border: ${({ $isActive, $hasText }) =>
    $isActive || $hasText
      ? `1px solid ${$hasText ? colors.etc.black : colors.gray[80]}`
      : 'none'};
  width: 100%;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: ${({ value }) => (value ? colors.etc.black : colors.gray[60])};
  resize: none;
  outline: none;
  &::placeholder {
    color: ${colors.gray[60]};
  }
`;

export const Separator = styled.div`
  height: 9px;
  width: 100%;
  background-color: ${colors.gray[95]};
`;

export const CharCount = styled.div<{ $isValid: boolean }>`
  font-size: 12px;
  text-align: right;
  color: ${({ $isValid }) =>
    $isValid ? colors.gray[60] : colors.alert[50]}; /* 10자 미만이면 빨간색 */
  margin-top: 4px;
`;
