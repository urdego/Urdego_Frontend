import {
  Button,
  ContentInput,
  Title,
  ContentWrapper,
  Hr,
  InputWrapper,
} from "./Input.styles";

interface InputProps {
  title: string;
  placeholder: string;
  isButton?: boolean;
}

const Input = ({ title, placeholder, isButton = false }: InputProps) => {
  return (
    <InputWrapper>
      <Title>{title}</Title>
      <ContentWrapper>
        <ContentInput placeholder={placeholder} />
        {isButton && <Button />}
      </ContentWrapper>
      <Hr />
    </InputWrapper>
  );
};

export default Input;
