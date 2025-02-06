import {
  StyledWButton,
  IconWrapper,
} from '@/components/Layout/WaitingRoom/WButton.styles';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface WButtonProps {
  buttonType?: 'icon' | 'default';
  disabled?: boolean;
  label?: string; // icon 타입에서는 label이 필요하지 않을 수 있음
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
          <Image
            src={icon}
            alt="Button icon"
            width={20}
            height={20}
            // 아이콘 버튼일 경우 이미지가 LCP 요소일 가능성이 있으므로 priority 적용
            priority={buttonType === 'icon'}
          />
        </IconWrapper>
      )}
      {buttonType !== 'icon' && label}
    </StyledWButton>
  );
};

export default WButton;
