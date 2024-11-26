import Image from 'next/image';
import {
  Button,
  ContentInput,
  Title,
  ContentWrapper,
  Hr,
  InputWrapper,
  InputContainer,
} from './Input.styles';
import eyeClose from '@styles/Icon/EyeClose.svg';
import eyeOpen from '@styles/Icon/EyeOpen.svg';

interface InputProps {
  title: string;
  placeholder: string;
  isButton?: boolean;
  isHiddenPassword?: boolean;
  handleClick?: () => void;
  onChange?: (value: string) => void;
  type?: string;
  validation?: React.ReactNode;
  autoComplete?: string;
}

const Input = ({
  title,
  placeholder,
  isButton = false,
  isHiddenPassword,
  handleClick,
  onChange,
  type = 'text',
  validation,
  autoComplete,
}: InputProps) => {
  return (
    <InputContainer>
      <InputWrapper>
        <Title>{title}</Title>
        <ContentWrapper>
          <ContentInput
            placeholder={placeholder}
            type={type}
            onChange={(e) => onChange?.(e.target.value)}
            autoComplete={autoComplete}
          />
          {isButton && (
            <Button onClick={handleClick}>
              <Image
                src={isHiddenPassword ? eyeClose : eyeOpen}
                alt={isHiddenPassword ? 'Show password' : 'Hide password'}
                width={24}
                height={24}
              />
            </Button>
          )}
        </ContentWrapper>
        <Hr />
      </InputWrapper>
      {validation}
    </InputContainer>
  );
};

export default Input;
