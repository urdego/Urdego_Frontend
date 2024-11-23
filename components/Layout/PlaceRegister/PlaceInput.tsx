import { useState } from 'react';
import {
  ContentInput,
  ContentResetButton,
  PlaceInputWrapper,
} from './PlaceInput.styles';
import { ClearIcon } from './PlaceInputIcon';

interface PlaceInputProps {
  placeholder: string;
}

const PlaceInput = ({ placeholder }: PlaceInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const resetChange = () => {
    setInputValue('');
  };

  return (
    <PlaceInputWrapper>
      <ContentInput
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <ContentResetButton onClick={resetChange}>
          <ClearIcon />
        </ContentResetButton>
      )}
    </PlaceInputWrapper>
  );
};

export default PlaceInput;
