import toast, { Toast } from 'react-hot-toast';
import { ToastContainer, Message } from './SuccessToast.styles';

interface SuccessToastProps {
  message: string;
}

export const SuccessToast = ({ message }: SuccessToastProps) => {
  return toast.custom(
    (t: Toast) => (
      <ToastContainer
        style={{
          opacity: t.visible ? 1 : 0,
          transform: `translateY(${t.visible ? 0 : 20}px)`,
          marginTop: '20px',
        }}
      >
        <Message>{message}</Message>
      </ToastContainer>
    ),
    {
      duration: 2000,
      position: 'top-center',
    }
  );
};
