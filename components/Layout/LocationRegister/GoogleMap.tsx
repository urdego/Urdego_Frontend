import useConvertLocationToAddress from '@/hooks/placeRegister/useConvertLocationToAddress';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import { AdvancedMarker, Map, MapMouseEvent } from '@vis.gl/react-google-maps';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserMarkerSrc from '@styles/Icon/UserMarker.svg';

interface GoogleMapProps {
  index: number;
  isLocationSelected: boolean;
  setIsLocationSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MarkerPosition {
  lat: number;
  lng: number;
}

const GoogleMap = ({
  index,
  isLocationSelected,
  setIsLocationSelected,
}: GoogleMapProps) => {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    lat: 0,
    lng: 0,
  });
  const { setPlaceInput } = usePlaceRegisterStore();
  const { handleReverseGeocoding } = useConvertLocationToAddress();

  useEffect(() => {
    // 마커의 위치와 도로명 주소 초기화
    if (isLocationSelected === false) {
      setMarkerPosition({ lat: 0, lng: 0 });
    }
  }, [isLocationSelected]);

  const handleMapClick = (e: MapMouseEvent) => {
    const { latLng } = e.detail;
    if (latLng) {
      // 클릭한 위치를 마커의 위치로 저장
      const newPosition = { lat: latLng.lat, lng: latLng.lng };
      setMarkerPosition(newPosition);

      // 역지오코딩으로 도로명 주소 반환
      handleReverseGeocoding({ index, latLng });

      setIsLocationSelected(true);
      setPlaceInput(index, 'lat', latLng.lat);
      setPlaceInput(index, 'lng', latLng.lng);
    }
  };

  return (
    <Map
      mapId={'LocationRegisterPage'}
      style={{ height: `calc(100vh - 40px)` }}
      defaultCenter={{ lat: 36.5, lng: 127.5 }}
      defaultZoom={8}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      onClick={handleMapClick}
    >
      {markerPosition.lat !== 0 && markerPosition.lng !== 0 && (
        <AdvancedMarker position={markerPosition} clickable={true}>
          <Image
            src={UserMarkerSrc}
            width={50}
            height={53}
            alt="UserMarker Icon"
          />
        </AdvancedMarker>
      )}
    </Map>
  );
};

export default GoogleMap;
