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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        maxLength={25}
      />
      {state && (
        <ContentResetButton onClick={resetChange}>
          <ClearIcon />
        </ContentResetButton>
      )}
    </PlaceInputWrapper>
  );
};

export default PlaceInput;
