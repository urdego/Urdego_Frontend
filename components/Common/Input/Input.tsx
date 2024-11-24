import {
  Button,
  ContentInput,
  Title,
  ContentWrapper,
  Hr,
  InputWrapper,
  InputContainer,
} from './Input.styles';

interface InputProps {
  title: string;
  placeholder: string;
  isButton?: boolean;
  isHiddenPassword?: boolean;
  handleClick?: () => void;
  onChange?: (value: string) => void;
  type?: string;
  validation?: React.ReactNode;
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
          />
          {isButton && (
            <Button
              $isHiddenPassword={isHiddenPassword}
              onClick={handleClick}
            />
          )}
        </ContentWrapper>
        <Hr />
      </InputWrapper>
      {validation}
    </InputContainer>
  );
};

export default Input;
