import { AdvancedMarker, Map, MapMouseEvent } from '@vis.gl/react-google-maps';
import Image from 'next/image';
import useCharacterMarker from '@/hooks/character/useCharacterMarker';
import { APIProvider } from '@vis.gl/react-google-maps';

interface GoogleMapProps {
  isLocationSelected: boolean;
  markerPosition: google.maps.LatLngLiteral;
  setMarkerPosition: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral>
  >;
}

const GoogleMap = ({ markerPosition, setMarkerPosition }: GoogleMapProps) => {
  const { getMyMarkerIcon } = useCharacterMarker();

  const handleMapClick = (e: MapMouseEvent) => {
    const { latLng } = e.detail;
    if (latLng) {
      setMarkerPosition(latLng); // 클릭한 위치를 마커의 위치로 저장
    }
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
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
          <AdvancedMarker
            position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
            clickable={true}
          >
            <Image
              src={getMyMarkerIcon()}
              width={50}
              height={53}
              alt="UserMarker Icon"
            />
          </AdvancedMarker>
        )}
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
