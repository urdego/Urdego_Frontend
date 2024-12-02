'use client';

import Button from '@/components/Common/Button/Button';
import TopBar from '@/components/Common/TopBar/TopBar';
import {
  ButtonLayout,
  LocationRegisterWrapper,
} from './locationRegister.styles';
import { useState } from 'react';
import GoogleMap from '@/components/Layout/LocationRegister/GoogleMap';
import { useRouter } from 'next/navigation';

interface LocationRegister {
  params: {
    index: string;
  };
}
const LocationRegister = ({ params }: LocationRegister) => {
  const router = useRouter();
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  return (
    <>
      <TopBar NavType="default" label="위치 추가하기" />
      <LocationRegisterWrapper>
        <GoogleMap
          index={Number(params.index)}
          isLocationSelected={isLocationSelected}
          setIsLocationSelected={setIsLocationSelected}
        />
        <ButtonLayout>
          <Button
            buttonType={isLocationSelected ? 'purple' : 'gray'}
            styleType="whiteBackground"
            label="취소하기"
            onClick={() => setIsLocationSelected(false)}
          />
          <Button
            buttonType={isLocationSelected ? 'purple' : 'gray'}
            label="선택하기"
            onClick={() =>
              isLocationSelected &&
              router.push('/placeRegister?source=locationRegister')
            }
          />
        </ButtonLayout>
      </LocationRegisterWrapper>
    </>
  );
};

export default LocationRegister;
