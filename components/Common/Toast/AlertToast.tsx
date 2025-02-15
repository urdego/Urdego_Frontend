import Image from 'next/image';
import toast, { Toast } from 'react-hot-toast';
import { ToastContainer, Message, IconWrapper } from './AlertToast.styles';
import alertIcon from '@/styles/Icon/Toast/alert.svg';

interface AlertToastProps {
  message: string;
}

export const AlertToast = ({ message }: AlertToastProps) => {
  return toast.custom(
    (t: Toast) => (
      <ToastContainer
        style={{
          opacity: t.visible ? 1 : 0,
          transform: `translateY(${t.visible ? 0 : 20}px)`,
          marginTop: '20px',
        }}
      >
        <IconWrapper>
          <Image src={alertIcon} alt="alert icon" width={24} height={24} />
        </IconWrapper>
        <Message>{message}</Message>
      </ToastContainer>
    ),
    {
      duration: 2000,
      position: 'bottom-center',
    }
  );
};

export default AlertToast;
