import { useState } from 'react';
import LocationSearchBox from './LocationSearchBox';
import {
  CancelButton,
  ModalContainer,
  ModalHeader,
  ModalWrapper,
} from './LocationSearchModal.styles';

interface LocationSearchModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LocationSearchModal = ({ setIsModalOpen }: LocationSearchModalProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <ModalWrapper>
      <ModalHeader>
        <LocationSearchBox
          isInputMode={true}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <CancelButton onClick={() => setIsModalOpen(false)}>취소</CancelButton>
      </ModalHeader>
      <ModalContainer></ModalContainer>
    </ModalWrapper>
  );
};

export default LocationSearchModal;
