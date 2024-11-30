'use client';

import Button from '@/components/Common/Button/Button';
import TopBar from '@/components/Common/TopBar/TopBar';
import {
  ButtonLayout,
  LocationRegisterWrapper,
} from './locationRegister.styles';
import { useState } from 'react';

const LocationRegister = () => {
  const [isLocationSelected, setIsLocationSelected] = useState(true);
  return (
    <>
      <TopBar NavType="default" label="위치 추가하기" />
      <LocationRegisterWrapper>
        {/* Google Map */}
        <ButtonLayout>
          <Button
            buttonType={isLocationSelected ? 'purple' : 'gray'}
            styleType="whiteBackground"
            label="취소하기"
          />
          <Button
            buttonType={isLocationSelected ? 'purple' : 'gray'}
            label="선택하기"
          />
        </ButtonLayout>
      </LocationRegisterWrapper>
    </>
  );
};

export default LocationRegister;
