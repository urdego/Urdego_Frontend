import GoogleMap from '@/components/Layout/LocationRegister/GoogleMap';
import BottomSheet from './BottomSheet';
import { useEffect, useState } from 'react';
import {
  ButtonLayout,
  LocationRegisterWrapper,
} from './ContentRegisterBottomSheet.styles';
import { ContentHeader } from './BottomSheet.styles';
import Button from '../Button/Button';
import useConvertLocationToAddress from '@/hooks/contentRegister/useConvertLocationToAddress';
import usePlaceRegisterStore from '@/stores/contentRegisterStore';

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
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral>({
      lat: 0,
      lng: 0,
    });
  const { handleReverseGeocoding } = useConvertLocationToAddress();
  const { setPlaceInput } = usePlaceRegisterStore();

  const handleCancellation = () => {
    setMarkerPosition({ lat: 0, lng: 0 });
    setIsOpen(false);
  };

  const handleSelection = () => {
    if (isLocationSelected) {
      handleReverseGeocoding({ index, latLng: markerPosition });
      setPlaceInput(index, 'lat', markerPosition.lat);
      setPlaceInput(index, 'lng', markerPosition.lng);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (markerPosition.lat !== 0 && markerPosition.lng !== 0) {
      setIsLocationSelected(true);
    }
  }, [markerPosition]);

  useEffect(() => {
    if (
      isOpen === false &&
      markerPosition.lat == 0 &&
      markerPosition.lng == 0
    ) {
      setIsLocationSelected(false);
    }
  }, [isOpen]);

  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} initHeight="long">
      <LocationRegisterWrapper>
        <ContentHeader>위치를 선택해주세요.</ContentHeader>
        <GoogleMap
          isLocationSelected={isLocationSelected}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
        <ButtonLayout>
          <Button
            buttonType={isLocationSelected ? 'purple' : 'gray'}
            styleType="whiteBackground"
            label="취소"
            onClick={handleCancellation}
          />
          <Button
            buttonType={isLocationSelected ? 'purple' : 'gray'}
            label="선택"
            onClick={handleSelection}
          />
        </ButtonLayout>
      </LocationRegisterWrapper>
    </BottomSheet>
  );
};

export default ContentRegisterBottomSheet;
