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
        <PlaceSearchButtonWrapper onClick={handleMoveToLocationRegister}>
          <SearchIcon />
          <LocationRegisterText>위치 추가하기</LocationRegisterText>
        </PlaceSearchButtonWrapper>
      )}
    </>
  );
};

export default PlaceSearchButton;
