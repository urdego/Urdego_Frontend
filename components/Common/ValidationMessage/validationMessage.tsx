import { StyledMessage } from '@/components/Common/ValidationMessage/validationMessage.styles';

interface ValidationMessageProps {
  message: string;
}

const ValidationMessage = ({ message }: ValidationMessageProps) => {
  return <StyledMessage>{message}</StyledMessage>;
};

export default ValidationMessage;
