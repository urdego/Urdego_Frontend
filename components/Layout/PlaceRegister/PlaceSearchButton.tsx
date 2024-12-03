import { useRouter } from 'next/navigation';
import {
  PlaceSearchButtonWrapper,
  PlaceTexthButtonWrapper,
  PlaceResetButton,
  LocationRegisterText,
  LocationText,
} from './PlaceSearchButton.styles';
import { SearchIcon } from './PlaceSearchButtonIcon';
import { ClearIcon } from './PlaceRegisterIcon';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';

interface PlaceSearchButtonProps {
  index: number;
  value: string | null;
}

const PlaceSearchButton = ({ index, value }: PlaceSearchButtonProps) => {
  const router = useRouter();
  const { setPlaceInput } = usePlaceRegisterStore();

  return (
    <>
      {value ? (
        <PlaceTexthButtonWrapper>
          <LocationText
            onClick={() => router.push(`/locationRegister/${index}`)}
          >
            {value}
          </LocationText>
          <PlaceResetButton
            onClick={() => setPlaceInput(index, 'address', null)}
          >
            <ClearIcon />
          </PlaceResetButton>
        </PlaceTexthButtonWrapper>
      ) : (
        <PlaceSearchButtonWrapper
          onClick={() => router.push(`/locationRegister/${index}`)}
        >
          <SearchIcon />
          <LocationRegisterText>위치 추가하기</LocationRegisterText>
        </PlaceSearchButtonWrapper>
      )}
    </>
  );
};

export default PlaceSearchButton;
