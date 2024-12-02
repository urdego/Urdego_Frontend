import usePlaceRegisterStore from '@/stores/placeRegisterStore';

interface ReverseGeocodingProps {
  index: number;
  latLng: {
    lat: number;
    lng: number;
  };
}

const useConvertLocationToAddress = () => {
  const { setPlaceInput } = usePlaceRegisterStore();

  const handleReverseGeocoding = ({ index, latLng }: ReverseGeocodingProps) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results) {
        const address = results[0].formatted_address;
        setPlaceInput(index, 'address', address); // 비동기 처리에 의해 함수 내에서 선언
      } else {
        console.error('Geocoding failed:', status);
      }
    });
  };

  return {
    handleReverseGeocoding,
  };
};

export default useConvertLocationToAddress;
