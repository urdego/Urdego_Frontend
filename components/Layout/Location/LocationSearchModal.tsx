import LocationSearchBox from './LocationSearchBox';
import {
  CancelButton,
  ModalContainer,
  ModalHeader,
  ModalWrapper,
} from './LocationSearchModal.styles';

const LocationSearchModal = () => {
  return (
    <ModalWrapper>
      <ModalHeader>
        <LocationSearchBox />
        <CancelButton>취소</CancelButton>
      </ModalHeader>
      <ModalContainer></ModalContainer>
    </ModalWrapper>
  );
};

export default LocationSearchModal;
