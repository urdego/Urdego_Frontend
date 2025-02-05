import {
  StyledWButton,
  IconWrapper,
} from '@/components/Layout/WaitingRoom/WButton.styles';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface WButtonProps {
  buttonType?: 'icon' | 'default';
  disabled?: boolean;
  label?: string; // icon 타입에서는 label이 optional
  icon?: string | StaticImageData;
  onClick?: () => void;
}

const WButton = ({
  buttonType = 'default',
  label,
  icon,
  onClick,
  disabled,
}: WButtonProps) => {
  return (
    <StyledWButton
      $buttonType={buttonType}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <IconWrapper $buttonType={buttonType}>
          {typeof icon === 'string' ? (
            <Image src={icon} alt="" width={20} height={20} />
          ) : (
            <Image src={icon.src} alt="" width={20} height={20} />
          )}
        </IconWrapper>
      )}
      {buttonType !== 'icon' && label}
    </StyledWButton>
  );
};

export default WButton;
