import { useRouter } from 'next/navigation';
import {
  PlaceSearchButtonWrapper,
  LocationRegisterText,
  LocationText,
} from './PlaceSearchButton.styles';
import { SearchIcon } from './PlaceSearchButtonIcon';

interface PlaceSearchButtonProps {
  index: number;
  value: string | null;
}

const PlaceSearchButton = ({ index, value }: PlaceSearchButtonProps) => {
  const router = useRouter();
  return (
    <PlaceSearchButtonWrapper
      onClick={() => router.push(`/locationRegister/${index}`)}
    >
      {value ? (
        <LocationText>{value}</LocationText>
      ) : (
        <>
          <SearchIcon />
          <LocationRegisterText>위치 추가하기</LocationRegisterText>
        </>
      )}
    </PlaceSearchButtonWrapper>
  );
};

export default PlaceSearchButton;
