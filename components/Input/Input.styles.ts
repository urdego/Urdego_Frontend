import styled from "styled-components";

export const InputWrapper = styled.div`
  padding-bottom: 32px;
  flex-grow: 1;
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

export const Button = styled.div<{ $isHiddenPassword: boolean | undefined }>`
  width: 24px;
  height: 24px;

  background-color: ${(props) =>
    props.$isHiddenPassword ? "#909090" : "#000000"};

  &:hover {
    cursor: pointer;
  }
`;
