import {
  ContentInput,
  ContentResetButton,
  PlaceInputWrapper,
} from './InputCard.styles';
import { ClearIcon } from './ContentRegisterIcon';

interface PlaceInputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCard = ({ placeholder, value, onChange }: PlaceInputProps) => {
  const resetChange = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <PlaceInputWrapper>
      <ContentInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={25}
      />
      {value && (
        <ContentResetButton onClick={resetChange}>
          <ClearIcon />
        </ContentResetButton>
      )}
    </PlaceInputWrapper>
  );
};

export default InputCard;
