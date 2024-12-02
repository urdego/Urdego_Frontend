import { StyledMessage } from '@/components/Common/ValidationMessage/ValidationMessage.styles';

interface ValidationMessageProps {
  message: string;
  type: 'success' | 'error'; // 'success'는 green, 'error'는 alert 색상
}

const ValidationMessage = ({ message, type }: ValidationMessageProps) => {
  return <StyledMessage type={type}>{message}</StyledMessage>;
};

export default ValidationMessage;
