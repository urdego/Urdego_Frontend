import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface GoogleMapProps {
  isLocationSelected: boolean;
  setIsLocationSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleMap = ({
  isLocationSelected,
  setIsLocationSelected,
}: GoogleMapProps) => {
  const [isMapLoad, setIsMapLoad] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (isLocationSelected === false) {
      setMarkerPosition({
        lat: 0,
        lng: 0,
      });
    }
  }, [isLocationSelected]);

  const handleMapClick = (e: MapMouseEvent) => {
    const { latLng } = e.detail;
    if (latLng) {
      const newPosition = { lat: latLng.lat, lng: latLng.lng };
      setMarkerPosition(newPosition);
      console.log('Clicked position:', newPosition);
      setIsLocationSelected(true);
    }
  };

  return (
    <div>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_LOCATION_REGISTER_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsMapLoad(true)}
      >
        {isMapLoad ? (
          <Map
            mapId={'LocationRegisterPage'}
            style={{ height: '100vh' }}
            defaultCenter={{ lat: 36.5, lng: 127.5 }}
            defaultZoom={8}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onClick={handleMapClick} // 지도 클릭 이벤트 처리
          >
            {markerPosition.lat !== 0 && markerPosition.lng !== 0 && (
              <AdvancedMarker
                position={markerPosition} // 마커 위치
                clickable={true}
              />
            )}
          </Map>
        ) : (
          <div>로딩중...</div>
        )}
      </APIProvider>
    </div>
  );
};

export default GoogleMap;
