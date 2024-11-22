import ImageUpload from './ImageUpload';
import PlaceInput from './PlaceInput';
import {
  PlaceRegistertext,
  PlaceRegisterWrapper,
} from './PlaceRegister.styles';
import PlaceSearchButton from './PlaceSearchButton';

interface PlaceRegisterProps {
  title: string;
  currCount: number;
  totalCount: number;
}

const PlaceRegister = ({
  title,
  currCount,
  totalCount,
}: PlaceRegisterProps) => {
  return (
    <PlaceRegisterWrapper>
      <PlaceRegistertext>{title}</PlaceRegistertext>
      <ImageUpload currCount={currCount} totalCount={totalCount} />
      <PlaceInput placeholder="장소명" />
      <PlaceSearchButton />
      <PlaceInput placeholder="(선택) 힌트를 작성해주세요" />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;
