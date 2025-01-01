import { SButton } from '@components/Layout/MyPage/SmallButton.styles';

interface SmallButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const SmallButton = ({ onClick, children }: SmallButtonProps) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

export default SmallButton;
