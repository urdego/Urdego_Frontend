import { forwardRef } from 'react';
import {
  InputContainer,
  InputWrapper,
  StyledInput,
  InputLabel,
} from './RoomTitleInput.styles';

interface RoomTitleInputProps {
  placeholder: string;
  label: string;
  variant?: 'default' | 'readonly';
}

const RoomTitleInput = forwardRef<HTMLInputElement, RoomTitleInputProps>(
  ({ placeholder, label, variant = 'default' }, ref) => {
    return (
      <InputContainer>
        <InputLabel>{label}</InputLabel>
        <InputWrapper>
          <StyledInput
            type="text"
            placeholder={placeholder}
            ref={ref}
            readOnly={variant === 'readonly'}
            $variant={variant}
          />
        </InputWrapper>
      </InputContainer>
    );
  }
);

RoomTitleInput.displayName = 'RoomTitleInput';

export default RoomTitleInput;
