import GoogleMap from '@/components/Layout/LocationRegister/GoogleMap';
import BottomSheet from './BottomSheet';
import { useState } from 'react';
import {
  ButtonLayout,
  LocationRegisterWrapper,
} from './ContentRegisterBottomSheet.styles';
import { ContentHeader } from './BottomSheet.styles';
import Button from '../Button/Button';

interface LocationRegisterBottomSheetProps {
  index: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ContentRegisterBottomSheet = ({
  index,
  isOpen,
  setIsOpen,
}: LocationRegisterBottomSheetProps) => {
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} initHeight="long">
      <LocationRegisterWrapper>
        <ContentHeader>위치를 선택해주세요.</ContentHeader>
        <GoogleMap
          index={index}
          isLocationSelected={isLocationSelected}
          setIsLocationSelected={setIsLocationSelected}
        />
        <ButtonLayout>
          <Button
            buttonType={isLocationSelected ? 'purple' : 'gray'}
            styleType="whiteBackground"
            label="취소"
            onClick={() => setIsLocationSelected(false)}
          />
          <Button
            buttonType={isLocationSelected ? 'purple' : 'gray'}
            label="선택"
            onClick={() => isLocationSelected && setIsOpen(false)}
          />
        </ButtonLayout>
      </LocationRegisterWrapper>
    </BottomSheet>
  );
};

export default ContentRegisterBottomSheet;
