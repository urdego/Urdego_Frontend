import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const LocationSearchButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  padding: 6px 12px;
  border-radius: 999px;
  background: ${colors.gray[95]};

  cursor: pointer;
`;

export const Input = styled.input`
  display: flex;
  flex: 1;
  background: transparent;
  border: none;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;

  &::placeholder {
    color: ${colors.gray[70]};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
  }
`;
