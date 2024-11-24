import styled from 'styled-components';

export const InputContainer = styled.div`
  padding-bottom: 32px;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding-left: 0;
  font-size: 16px;
  font-weight: 400;
`;

export const Hr = styled.div`
  height: 1px;
  margin-top: 4px;
  background-color: #909090;
`;

export const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  &:hover {
    opacity: 0.8;
  }
`;
