import {
  StyledButton,
  IconWrapper,
} from '@/components/Common/Button/Button.styles';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface ButtonProps {
  buttonType?: 'purple' | 'gray' | 'lightGray' | 'icon' | 'forWaitingRoom';
  buttonSize?: 'small' | 'large';
  buttonHeight?: 'default' | 'short' | 'long';
  styleType?: 'whiteBackground' | 'coloredBackground';
  disabled?: boolean;
  label?: string; // icon 타입에서는 label이 optional
  icon?: string | StaticImageData;
  onClick?: () => void;
  $iconPosition?: 'left' | 'right';
}

const Button = ({
  buttonType = 'purple',
  buttonSize = 'large',
  buttonHeight = 'default',
  styleType = 'coloredBackground',
  label,
  icon,
  onClick,
  disabled,
  $iconPosition = 'left',
}: ButtonProps) => {
  return (
    <StyledButton
      $buttonType={buttonType}
      $buttonSize={buttonSize}
      $buttonHeight={buttonHeight}
      $styleType={styleType}
      onClick={onClick}
      disabled={disabled}
      $iconPosition={$iconPosition}
    >
      {icon && (
        <IconWrapper $buttonType={buttonType}>
          {typeof icon === 'string' ? (
            <Image src={icon} alt="" width={16} height={16} />
          ) : (
            <Image src={icon.src} alt="" width={16} height={16} />
          )}
        </IconWrapper>
      )}
      {buttonType !== 'icon' && label}
    </StyledButton>
  );
};

export default Button;
