import LocationList from '../Home/LocationList/LocationList';
import LocationSearchBox from './LocationSearchBox';
import {
  CancelButton,
  ModalContainer,
  ModalHeader,
  ModalWrapper,
} from './LocationSearchModal.styles';
import useSearchLocationList from '@/hooks/locationList/useSearchLocationList';

interface LocationSearchModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LocationSearchModal = ({ setIsModalOpen }: LocationSearchModalProps) => {
  const { locationList, searchKeyword, setSearchKeyword } =
    useSearchLocationList();
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
      <ModalContainer>
        {locationList.map((location, index) => (
          <LocationList key={`key+${index}`} location={location} />
        ))}
        {locationList.map((location, index) => (
          <LocationList key={`key+${index}`} location={location} />
        ))}
        {locationList.map((location, index) => (
          <LocationList key={`key+${index}`} location={location} />
        ))}
        {locationList.map((location, index) => (
          <LocationList key={`key+${index}`} location={location} />
        ))}
        {locationList.map((location, index) => (
          <LocationList key={`key+${index}`} location={location} />
        ))}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default LocationSearchModal;
