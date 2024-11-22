import ImageUpload from './ImageUpload';
import PlaceInput from './PlaceInput';
import { PlaceRegisterWrapper } from './PlaceRegister.styles';

const PlaceRegister = () => {
  return (
    <PlaceRegisterWrapper>
      <ImageUpload currCount={0} totalCount={3} />
      <PlaceInput placeholder="장소명" />
      <PlaceInput placeholder="장소명" />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;
