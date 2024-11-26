import { useState } from 'react';
import {
  ContentInput,
  ContentResetButton,
  PlaceInputWrapper,
} from './PlaceInput.styles';
import { ClearIcon } from './PlaceInputIcon';

interface PlaceInputProps {
  placeholder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const PlaceInput = ({ placeholder, state, setState }: PlaceInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setState(event.target.value);
  };

  const resetChange = () => {
    setInputValue('');
    setState('');
  };

  return (
    <PlaceInputWrapper>
      <ContentInput
        placeholder={placeholder}
        value={state}
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
