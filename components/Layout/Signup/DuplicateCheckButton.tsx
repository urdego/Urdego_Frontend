import { Button } from '@layout/Signup/DuplicateCheckButton.styles';

interface DuplicateCheckButtonProps {
  handleClick: () => void;
}

const DuplicateCheckButton = ({ handleClick }: DuplicateCheckButtonProps) => {
  return <Button onClick={handleClick}>중복확인</Button>;
};

export default DuplicateCheckButton;
