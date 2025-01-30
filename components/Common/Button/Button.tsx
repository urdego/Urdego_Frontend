import {
  StyledButton,
  IconWrapper,
} from '@/components/Common/Button/Button.styles';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface ButtonProps {
  buttonType?: 'purple' | 'gray' | 'lightGray';
  buttonSize?: 'small' | 'large';
  buttonHeight?: 'default' | 'short' | 'long';
  styleType?: 'whiteBackground' | 'coloredBackground';
  disabled?: boolean;
  label: string;
  icon?: string | StaticImageData;
  onClick?: () => void;
  $iconPosition?: 'left' | 'right';
  hidden?: boolean;
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
  hidden = false,
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
      style={{
        display: hidden ? 'none' : 'flex',
      }}
    >
      {icon && (
        <IconWrapper>
          {typeof icon === 'string' ? (
            <Image src={icon} alt="" width={12} height={12} />
          ) : (
            <Image src={icon.src} alt="" width={12} height={12} />
          )}
        </IconWrapper>
      )}
      {label}
    </StyledButton>
  );
};

export default Button;
