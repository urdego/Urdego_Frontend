import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  CheckboxOptionWrapper,
  Checkbox,
} from '@common/CheckboxOption/CheckboxOption.styles';
import EmptyCheckBoxIcon from '@styles/Icon/circle.svg';
import CheckedBoxIcon from '@styles/Icon/check_circle.svg';

interface CheckboxOptionProps {
  label: string;
  size?: 'default' | 'big';
  onChange?: (checked: boolean) => void;
  isChecked?: boolean;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  label,
  size = 'default',
  onChange,
  isChecked = false,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleCheckbox = useCallback(() => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  }, [checked, onChange]);

  const iconSize = size === 'big' ? 24 : 20;

  return (
    <CheckboxOptionWrapper onClick={toggleCheckbox} size={size}>
      <Checkbox size={size}>
        <Image
          src={checked ? CheckedBoxIcon : EmptyCheckBoxIcon}
          alt={checked ? 'Checked' : 'Unchecked'}
          width={iconSize}
          height={iconSize}
        />
      </Checkbox>
      {label}
    </CheckboxOptionWrapper>
  );
};

export default React.memo(CheckboxOption);
