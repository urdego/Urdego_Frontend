import {
  Button,
  ContentInput,
  Title,
  ContentWrapper,
  Hr,
  InputWrapper,
} from '@/components/Aommon/Input/Input.styles';

interface InputProps {
  title: string;
  placeholder: string;
  isButton?: boolean;
  isHiddenPassword?: boolean;
  handleClick?: () => void;
}

const Input = ({
  title,
  placeholder,
  isButton = false,
  isHiddenPassword,
  handleClick,
}: InputProps) => {
  return (
    <InputWrapper>
      <Title>{title}</Title>
      <ContentWrapper>
        <ContentInput placeholder={placeholder} />
        {isButton && (
          <Button $isHiddenPassword={isHiddenPassword} onClick={handleClick} />
        )}
      </ContentWrapper>
      <Hr />
    </InputWrapper>
  );
};

export default Input;
