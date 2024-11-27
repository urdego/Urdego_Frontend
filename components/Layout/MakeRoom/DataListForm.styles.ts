import styled, { css } from 'styled-components';
import colors from '@/styles/color/palette';

export const SelectContainer = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SelectLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.etc.black};
`;

export const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledButton = styled.button<{
  $isOpen: boolean;
  $isPlaceholder: boolean;
}>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${colors.gray[70]};
  border-radius: 4px;
  background-color: white;
  font-weight: 400;
  line-height: 150%;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(props) =>
    props.$isPlaceholder ? colors.gray[70] : colors.etc.black};

  &:focus {
    outline: none;
    border-color: ${colors.purple[60]};
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      border-color: ${colors.purple[60]};
    `}
`;

export const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${colors.gray[70]};
  transition: transform 0.2s ease;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  padding: 0;
  background-color: white;
  border: 1px solid ${colors.gray[70]};
  border-radius: 4px;
  list-style: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

export const DropdownItem = styled.li<{ $isSelected: boolean }>`
  padding: 12px;
  cursor: pointer;
  color: ${colors.etc.black};

  &:hover {
    background-color: ${colors.purple[95]};
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: ${colors.purple[80]};
      color: ${colors.etc.black};
    `}
`;
