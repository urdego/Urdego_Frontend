import React, { useState } from 'react';
import {
  OptionToggleWrapper,
  LeftSection,
  Icon,
  OptionToggleLabel,
  Toggle,
} from '@common/OptionToggle/OptionToggle.styles';

interface OptionToggleProps {
  label: string;
  icon?: React.ReactNode;
}

const OptionToggle = ({ label, icon }: OptionToggleProps) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <OptionToggleWrapper>
      <LeftSection>
        {icon && <Icon>{icon}</Icon>}
        <OptionToggleLabel>{label}</OptionToggleLabel>
      </LeftSection>
      <Toggle $isOn={isToggled} onClick={() => setIsToggled(!isToggled)} />
    </OptionToggleWrapper>
  );
};

export default OptionToggle;
