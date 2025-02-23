import {
  PlaceSearchButtonWrapper,
  PlaceTextButtonWrapper,
  PlaceResetButton,
  LocationRegisterText,
  LocationText,
} from './LocationSearchButton.styles';
import { ClearIcon, SearchIcon } from './ContentRegisterIcon';
import usePlaceRegisterStore from '@/stores/contentRegisterStore';
import useToggleBottomSheet from '@/hooks/bottomSheet/useToggleBottomSheet';
import LocationRegisterBottomSheet from '@/components/Common/BottomSheet/ContentRegisterBottomSheet';

interface PlaceSearchButtonProps {
  index: number;
  value: string | null;
}

const LocationSearchButton = ({ index, value }: PlaceSearchButtonProps) => {
  const { setPlaceInput } = usePlaceRegisterStore();
  const { isOpen, setIsOpen, toggleBottomSheet } = useToggleBottomSheet();

  return (
    <>
      {value ? (
        <PlaceTextButtonWrapper>
          <LocationText onClick={toggleBottomSheet}>{value}</LocationText>
          <PlaceResetButton
            onClick={() => setPlaceInput(index, 'address', null)}
          >
            <ClearIcon />
          </PlaceResetButton>
        </PlaceTextButtonWrapper>
      ) : (
        <PlaceSearchButtonWrapper onClick={toggleBottomSheet}>
          <SearchIcon />
          <LocationRegisterText>위치 추가하기</LocationRegisterText>
        </PlaceSearchButtonWrapper>
      )}
      <LocationRegisterBottomSheet
        index={index}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default LocationSearchButton;
