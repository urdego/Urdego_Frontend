import { PButton } from '@components/Layout/MyPage/ProfileButton.styles';

interface ProfileButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ProfileButton = ({ onClick, children }: ProfileButtonProps) => {
  return <PButton onClick={onClick}>{children}</PButton>;
};

export default ProfileButton;
