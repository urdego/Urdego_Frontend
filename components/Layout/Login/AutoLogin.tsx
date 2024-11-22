import React from 'react';
import {
  CheckboxContainer,
  Checkbox,
  Label,
} from '@layout/Login/AutoLogin.styles';

function AutoLoginCheckbox() {
  return (
    <CheckboxContainer>
      <Checkbox id="autoLogin" />
      <Label htmlFor="autoLogin">자동로그인</Label>
    </CheckboxContainer>
  );
}

export default AutoLoginCheckbox;
