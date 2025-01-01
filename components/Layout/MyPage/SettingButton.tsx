import {
  SetButton,
  SetButtonWrapper,
} from '@components/Layout/MyPage/SettingButton.styles';
import direction from '@styles/Icon/Right_dir.svg';
import Image from 'next/image';

interface SettingButtonProps {
  label: string;
  onClick: () => void;
}

const SettingButton = ({ label, onClick }: SettingButtonProps) => {
  return (
    <SetButtonWrapper onClick={onClick}>
      <SetButton>{label}</SetButton>
      <Image src={direction} width={24} height={24} alt="Direction" />
    </SetButtonWrapper>
  );
};

export default SettingButton;
