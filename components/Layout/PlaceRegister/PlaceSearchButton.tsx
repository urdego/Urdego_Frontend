import { useRouter } from 'next/navigation';
import {
  PlaceSearchButtonWrapper,
  PlaceTexthButtonWrapper,
  PlaceResetButton,
  LocationRegisterText,
  LocationText,
} from './PlaceSearchButton.styles';
import { ClearIcon, SearchIcon } from './PlaceRegisterIcon';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import useToggleBottomSheet from '@/hooks/bottomSheet/useToggleBottomSheet';
import LocationRegisterBottomSheet from '@/components/Common/BottomSheet/LocationRegisterBottomSheet';

interface PlaceSearchButtonProps {
  index: number;
  value: string | null;
}

const PlaceSearchButton = ({ index, value }: PlaceSearchButtonProps) => {
  const router = useRouter();
  const { setPlaceInput } = usePlaceRegisterStore();

  const handleMoveToLocationRegister = () => {
    router.push(`/locationRegister/${index}`);
  };
  const { isOpen, setIsOpen, toggleBottomSheet } = useToggleBottomSheet();

  return (
    <>
      {value ? (
        <PlaceTexthButtonWrapper>
          <LocationText onClick={handleMoveToLocationRegister}>
            {value}
          </LocationText>
          <PlaceResetButton
            onClick={() => setPlaceInput(index, 'address', null)}
          >
            <ClearIcon />
          </PlaceResetButton>
        </PlaceTexthButtonWrapper>
      ) : (
        <PlaceSearchButtonWrapper onClick={toggleBottomSheet}>
          <SearchIcon />
          <LocationRegisterText>위치 추가하기</LocationRegisterText>
        </PlaceSearchButtonWrapper>
      )}
      {isOpen && (
        <LocationRegisterBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default PlaceSearchButton;
