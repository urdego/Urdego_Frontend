import Image from 'next/image';
import {
  LocationListWrapper,
  LocationImageContainer,
  LocationContainer,
  LocationTitle,
  LocationDetail,
} from './LocationList.styles';

interface LocationListProps {
  location: {
    contentName: string;
    hint: string;
    address: string;
    latitude: number;
    longitude: number;
    url: string;
  };
}

const LocationList = ({ location }: LocationListProps) => {
  return (
    <LocationListWrapper>
      <LocationImageContainer>
        <Image
          src={location?.url}
          alt="Location Image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 430px) 100vw"
        />
      </LocationImageContainer>

      <LocationContainer>
        <LocationTitle>{location?.contentName}</LocationTitle>
        <LocationDetail>{location?.address}</LocationDetail>
      </LocationContainer>
    </LocationListWrapper>
  );
};

export default LocationList;
