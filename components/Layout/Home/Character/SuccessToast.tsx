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
          marginBottom: '280px',
        }}
      >
        <Message dangerouslySetInnerHTML={{ __html: message }} />
      </ToastContainer>
    ),
    {
      duration: 2000,
      position: 'bottom-center',
    }
  );
};
