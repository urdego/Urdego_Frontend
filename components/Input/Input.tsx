import {
  Button,
  ContentInput,
  Title,
  ContentWrapper,
  Hr,
} from "./Input.styles";

interface InputProps {
  isButton?: boolean;
}

const Input = ({ isButton = true }: InputProps) => {
  return (
    <div>
      <Title>비밀번호</Title>
      <ContentWrapper>
        <ContentInput placeholder="비밀번호를 입력해주세요" />
        {isButton && <Button />}
      </ContentWrapper>
      <Hr />
    </div>
  );
};

export default Input;
