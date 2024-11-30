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

interface MarkerPosition {
  lat: number;
  lng: number;
}

const GoogleMap = ({
  isLocationSelected,
  setIsLocationSelected,
}: GoogleMapProps) => {
  const [isMapLoad, setIsMapLoad] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
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
        apiKey={
          process.env
            .NEXT_PUBLIC_LOCATION_REGISTER_GOOGLE_MAPS_API_KEY as string
        }
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
            onClick={handleMapClick}
          >
            {markerPosition.lat !== 0 && markerPosition.lng !== 0 && (
              <AdvancedMarker position={markerPosition} clickable={true} />
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
