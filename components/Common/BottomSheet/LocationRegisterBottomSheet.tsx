import GoogleMap from '@/components/Layout/LocationRegister/GoogleMap';
import BottomSheet from './BottomSheet';
import { useState } from 'react';
import {
  ButtonLayout,
  LocationRegisterWrapper,
} from './LocationRegisterBottomSheet.styles';
import { ContentHeader } from './BottomSheet.styles';
import Button from '../Button/Button';

interface LocationRegisterBottomSheetProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LocationRegisterBottomSheet = ({
  setIsOpen,
}: LocationRegisterBottomSheetProps) => {
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  return (
    <BottomSheet setIsOpen={setIsOpen}>
      <LocationRegisterWrapper>
        <ContentHeader>위치를 선택해주세요.</ContentHeader>
        <GoogleMap
          index={1}
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
            onClick={() => isLocationSelected && setIsOpen(false)}
          />
        </ButtonLayout>
      </LocationRegisterWrapper>
    </BottomSheet>
  );
};

export default LocationRegisterBottomSheet;
