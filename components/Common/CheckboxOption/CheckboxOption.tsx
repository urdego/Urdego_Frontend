import { useState } from 'react';
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
}

const CheckboxOption = ({ label, size = 'default' }: CheckboxOptionProps) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked((prev) => !prev);
  };

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

export default CheckboxOption;
