import { useState, useEffect } from 'react';
import { ButtonStyled } from './InviteButton.styles';

interface UserInfo {
  id: number;
  nickname: string;
}

interface InviteButtonProps {
  onClick: () => Promise<boolean> | boolean; // 성공 여부를 반환하도록 수정
  selectedUser: UserInfo | null;
}

export type ButtonState = 'default' | 'selected' | 'completed';

function InviteButton({ onClick, selectedUser }: InviteButtonProps) {
  const [buttonState, setButtonState] = useState<ButtonState>('default');
  const [buttonText, setButtonText] = useState('검색');

  useEffect(() => {
    if (selectedUser) {
      setButtonState('selected');
      setButtonText('초대하기');
    } else {
      setButtonState('default');
      setButtonText('검색');
    }
  }, [selectedUser]);

  const handleClick = async () => {
    if (selectedUser) {
      const success = await onClick();

      if (success) {
        setButtonState('completed');
        setButtonText('초대완료!');

        setTimeout(() => {
          setButtonState('default');
          setButtonText('검색');
        }, 1000);
      }
    } else {
      onClick();
    }
  };

  return (
    <ButtonStyled
      $buttonState={buttonState}
      onClick={handleClick}
      type="button"
    >
      {buttonText}
    </ButtonStyled>
  );
}

export default InviteButton;
