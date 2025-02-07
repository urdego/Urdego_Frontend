import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${colors.gray[95]};
  border-radius: 999px;
  padding: 8px 16px;
  margin-bottom: 16px;
  gap: 8px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 24px;
  font-size: 16px;
  border: none;
  outline: none;
  background: transparent;
  padding-left: 33px;

  &::placeholder {
    color: ${colors.gray[70]};
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  line-height: 0;
`;
