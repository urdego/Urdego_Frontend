import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface GoogleMapProps {
  setIsLocationSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleMap = ({ setIsLocationSelected }: GoogleMapProps) => {
  const [isMapLoad, setIsMapLoad] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 22.54992,
    lng: 0,
  });

  useEffect(() => {
    if (isMapLoad) setIsLocationSelected(true);
  }, [isMapLoad]);

  const handleMapClick = (e: MapMouseEvent) => {
    const { latLng } = e.detail;
    if (latLng) {
      const newPosition = { lat: latLng.lat, lng: latLng.lng };
      setMarkerPosition(newPosition);
      console.log('Clicked position:', newPosition);
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
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={10}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onClick={handleMapClick} // 지도 클릭 이벤트 처리
          >
            <AdvancedMarker
              position={markerPosition} // 마커 위치
              clickable={true}
            />
          </Map>
        ) : (
          <div>로딩중...</div>
        )}
      </APIProvider>
    </div>
  );
};

export default GoogleMap;
