import { StyledButton, IconWrapper } from "./Button.styles";
import { StaticImageData } from "next/image";

interface ButtonProps {
  buttonType?: "fill" | "outline";
  buttonSize?: "small" | "large";
  buttonHeight?: "default" | "short";
  label: string;
  icon?: string | StaticImageData;
  onClick?: () => void;
}

const Button = ({
  buttonType = "fill",
  buttonSize = "large",
  buttonHeight = "default",
  label,
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton
      $buttonType={buttonType}
      $buttonSize={buttonSize}
      $buttonHeight={buttonHeight}
      onClick={onClick}
    >
      {icon && (
        <IconWrapper>
          {typeof icon === "string" ? (
            <img src={icon} alt="" />
          ) : (
            <img src={icon.src} alt="" />
          )}
        </IconWrapper>
      )}
      {label}
    </StyledButton>
  );
};

export default Button;
