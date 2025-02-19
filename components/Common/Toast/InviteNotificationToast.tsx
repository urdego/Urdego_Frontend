'use client';

import toast, { Toast } from 'react-hot-toast';
import {
  InviteToastContainer,
  InviteMessage,
  InviteButtonWrapper,
  InviteButton,
} from '@/components/Common/Toast/InviteNotificationToast.styles';

interface InviteNotificationToastProps {
  senderNickname: string;
  targetNickname: string;
  roomName: string;
  onAccept: () => void;
  onDecline: () => void;
}

export function showInviteNotificationToast({
  senderNickname,
  targetNickname,
  roomName,
  onAccept,
  onDecline,
}: InviteNotificationToastProps) {
  return toast.custom(
    (t: Toast) => (
      <InviteToastContainer
        style={{
          opacity: t.visible ? 1 : 0,
          transform: `translateY(${t.visible ? 0 : 20}px)`,
          marginTop: '20px',
        }}
      >
        <InviteMessage>
          <strong>{senderNickname}</strong> 님이{' '}
          <strong>{targetNickname}</strong> 님에게 <strong>{roomName}</strong>{' '}
          방에 초대하셨습니다.
        </InviteMessage>
        <InviteButtonWrapper>
          <InviteButton
            onClick={() => {
              onAccept();
              toast.dismiss(t.id);
            }}
          >
            수락
          </InviteButton>
          <InviteButton
            onClick={() => {
              onDecline();
              toast.dismiss(t.id);
            }}
          >
            거절
          </InviteButton>
        </InviteButtonWrapper>
      </InviteToastContainer>
    ),
    {
      duration: 5000,
      position: 'bottom-center',
    }
  );
}

export default showInviteNotificationToast;
