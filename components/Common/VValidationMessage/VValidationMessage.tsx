import { StyledMessage } from '@/components/Common/ValidationMessage/ValidationMessage.styles';

interface ValidationMessageProps {
  message: string;
}

const ValidationMessage = ({ message }: ValidationMessageProps) => {
  return <StyledMessage>{message}</StyledMessage>;
};

export default ValidationMessage;
