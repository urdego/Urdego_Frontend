import styled, { css } from "styled-components";

interface StyledButtonProps {
  $buttonType: "fill" | "outline";
  $buttonSize: "small" | "large";
  $buttonHeight: "default" | "short";
}

export const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  border-radius: 4px;
  padding: 16px;
  font-weight: 700;
  user-select: none;

  ${({ $buttonType }) =>
    $buttonType === "fill"
      ? css`
          background-color: black;
          color: white;
          border: none;
          &:hover {
            opacity: 0.8;
          }
        `
      : css`
          background-color: white;
          color: black;
          border: 1px solid black;
          &:hover {
            opacity: 0.8;
          }
        `}

  ${({ $buttonSize }) =>
    $buttonSize === "small"
      ? css`
          width: 166px;
          font-size: 16px;
        `
      : css`
          width: 345px;
          font-size: 16px;
        `}

    ${({ $buttonHeight }) =>
    $buttonHeight === "default"
      ? css`
          height: 48px;
        `
      : css`
          height: 40px;
        `}
`;

export const IconWrapper = styled.span`
  margin-right: 8px;
  vertical-align: middle;

  img {
    width: 16px;
    height: 16px;
    display: inline-block;
  }
`;
