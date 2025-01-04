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
}

const CheckboxOption = ({ label }: CheckboxOptionProps) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked((prev) => !prev);
  };

  return (
    <CheckboxOptionWrapper onClick={toggleCheckbox}>
      <Checkbox>
        <Image
          src={checked ? CheckedBoxIcon : EmptyCheckBoxIcon}
          alt={checked ? 'Checked' : 'Unchecked'}
          width={20}
          height={20}
        />
      </Checkbox>
      {label}
    </CheckboxOptionWrapper>
  );
};

export default CheckboxOption;
