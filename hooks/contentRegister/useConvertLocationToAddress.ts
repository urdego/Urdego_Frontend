import usePlaceRegisterStore from '@/stores/contentRegisterStore';

interface ReverseGeocodingProps {
  index: number;
  latLng: google.maps.LatLngLiteral;
}

const useConvertLocationToAddress = () => {
  const { setPlaceInput } = usePlaceRegisterStore();

  const handleReverseGeocoding = ({
    index,
    latLng,
  }: ReverseGeocodingProps): Promise<string> => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results) {
          const address = results[0].formatted_address;
          setPlaceInput(index, 'address', address);
          resolve(address);
        } else {
          reject(
            new Error('사진의 위경도를 도로명 주소로 변환하는 것에 실패했어요')
          );
        }
      });
    });
  };

  return {
    handleReverseGeocoding,
  };
};

export default useConvertLocationToAddress;
