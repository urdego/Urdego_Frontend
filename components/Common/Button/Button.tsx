import {
  StyledButton,
  IconWrapper,
} from '@/components/Common/Button/Button.styles';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface ButtonProps {
  buttonType?: 'purple' | 'gray' | 'lightGray';
  buttonSize?: 'small' | 'large';
  buttonHeight?: 'default' | 'short';
  styleType?: 'whiteBackground' | 'coloredBackground';
  disabled?: boolean;
  label: string;
  icon?: string | StaticImageData;
  onClick?: () => void;
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
}: ButtonProps) => {
  const ActiveButtonType = disabled ? 'gray' : buttonType;
  return (
    <StyledButton
      $buttonType={ActiveButtonType}
      $buttonSize={buttonSize}
      $buttonHeight={buttonHeight}
      $styleType={styleType}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <IconWrapper>
          {typeof icon === 'string' ? (
            <Image src={icon} alt="" />
          ) : (
            <Image src={icon.src} alt="" />
          )}
        </IconWrapper>
      )}
      {label}
    </StyledButton>
  );
};

export default Button;
