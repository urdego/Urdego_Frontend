import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const PlaceInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #aaabab;
  padding: 12px;
`;

export const ContentInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  flex-grow: 1;

  &:focus {
    color: ${colors.etc.black};
  }

  &::placeholder {
    color: ${colors.gray[70]};
  }
`;

export const ContentResetButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
`;
