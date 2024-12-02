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

interface PlaceSearchButtonProps {
  index: number;
  value: string | null;
}

const PlaceSearchButton = ({ index, value }: PlaceSearchButtonProps) => {
  const router = useRouter();

  return (
    <>
      {value ? (
        <PlaceTexthButtonWrapper>
          <LocationText>{value}</LocationText>
          <PlaceResetButton
            onClick={() => router.push(`/locationRegister/${index}`)}
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
