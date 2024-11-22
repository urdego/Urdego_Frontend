import {
  PlaceSearchButtonWrapper,
  PlaceSearchText,
} from './PlaceSearchButton.styles';
import { SearchIcon } from './PlaceSearchButtonIcon';

const PlaceSearchButton = () => {
  return (
    <PlaceSearchButtonWrapper>
      <SearchIcon />
      <PlaceSearchText>위치 추가하기</PlaceSearchText>
    </PlaceSearchButtonWrapper>
  );
};

export default PlaceSearchButton;
