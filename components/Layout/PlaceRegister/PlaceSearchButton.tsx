import { useRouter } from 'next/navigation';
import {
  PlaceSearchButtonWrapper,
  PlaceSearchText,
} from './PlaceSearchButton.styles';
import { SearchIcon } from './PlaceSearchButtonIcon';

interface PlaceSearchButtonProps {
  index: number;
}

const PlaceSearchButton = ({ index }: PlaceSearchButtonProps) => {
  const router = useRouter();
  return (
    <PlaceSearchButtonWrapper
      onClick={() => router.push(`/locationRegister/${index}`)}
    >
      <SearchIcon />
      <PlaceSearchText>위치 추가하기</PlaceSearchText>
    </PlaceSearchButtonWrapper>
  );
};

export default PlaceSearchButton;
