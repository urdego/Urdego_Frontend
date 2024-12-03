import toast from 'react-hot-toast';
import {
  ToastContainer,
  Message,
  ButtonWrapper,
  RejectButton,
  AcceptButton,
} from '../InviteToast/InviteToast.styles';

interface InviteToastProps {
  message: string;
  onAccept: () => void;
  onReject?: () => void;
  toastId: string;
}

export const InviteToast = ({
  message,
  onAccept,
  onReject,
  toastId,
}: InviteToastProps) => {
  return (
    <ToastContainer>
      <Message>{message}</Message>
      <ButtonWrapper>
        <RejectButton
          onClick={() => {
            onReject?.();
            toast.dismiss(toastId);
          }}
        >
          거절
        </RejectButton>
        <AcceptButton
          onClick={() => {
            onAccept();
            toast.dismiss(toastId);
          }}
        >
          수락
        </AcceptButton>
      </ButtonWrapper>
    </ToastContainer>
  );
};
