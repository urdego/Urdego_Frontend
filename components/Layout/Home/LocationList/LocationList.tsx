import {
  LocationListWrapper,
  LocationImage,
  LocationContainer,
  LocationTitle,
  LocationDetail,
} from './LocationList.styles';

const LocationList = () => {
  return (
    <LocationListWrapper>
      <LocationImage />
      <LocationContainer>
        <LocationTitle>경복궁</LocationTitle>
        <LocationDetail>서울 종로구 어쩌구 저쩌구</LocationDetail>
      </LocationContainer>
    </LocationListWrapper>
  );
};

export default LocationList;
