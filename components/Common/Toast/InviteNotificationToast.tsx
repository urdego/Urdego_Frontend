'use client';

import toast, { Toast } from 'react-hot-toast';
import {
  InviteToastContainer,
  InviteMessage,
  InviteButtonWrapper,
  InviteButton,
} from '@/components/Common/Toast/InviteNotificationToast.styles';
import colors from '@/styles/color/palette';

interface InviteNotificationToastProps {
  senderNickname: string;
  targetNickname: string;
  roomName: string;
  onAccept: () => void;
  onDecline: () => void;
}

export function InviteNotificationToast({
  senderNickname,
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
          <strong>{senderNickname}</strong> 님이 <strong>{roomName}</strong>{' '}
          방으로 초대하셨습니다.
        </InviteMessage>
        <InviteButtonWrapper>
          <InviteButton
            style={{ backgroundColor: colors.purple[50] }}
            onClick={() => {
              onAccept();
              toast.dismiss(t.id);
            }}
          >
            수락
          </InviteButton>
          <InviteButton
            style={{ backgroundColor: colors.gray[70] }}
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
      position: 'top-center',
    }
  );
}

export default InviteNotificationToast;
