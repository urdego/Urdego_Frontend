import React, { useState } from 'react';
import {
  FormContainer,
  Label,
  ControlsContainer,
  Number,
  IconButton,
  ControlsWrapper,
} from '@layout/MakeRoom/NumSelectForm.styles';
import minusIcon from '@styles/Icon/minusIcon.svg';
import plusIcon from '@styles/Icon/plusIcon.svg';
import Image from 'next/image';

interface NumSelectFormProps {
  label: string;
  initialValue?: number;
  minValue?: number;
  maxValue: number;
  onChange?: (value: number) => void;
}

const NumSelectForm = ({
  label,
  initialValue = 1,
  minValue = 1,
  maxValue,
  onChange,
}: NumSelectFormProps) => {
  const [value, setValue] = useState(initialValue);

  const handleDecrease = () => {
    if (value > minValue) {
      const newValue = value - 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrease = () => {
    if (value < maxValue) {
      const newValue = value + 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <FormContainer>
      <Label>{label}</Label>
      <ControlsContainer>
        <ControlsWrapper>
          <IconButton onClick={handleDecrease} disabled={value <= minValue}>
            <Image src={minusIcon} alt="decrease" width={24} height={24} />
          </IconButton>
          <Number>{value}</Number>
          <IconButton onClick={handleIncrease} disabled={value >= maxValue}>
            <Image src={plusIcon} alt="increase" width={24} height={24} />
          </IconButton>
        </ControlsWrapper>
      </ControlsContainer>
    </FormContainer>
  );
};

export default NumSelectForm;
