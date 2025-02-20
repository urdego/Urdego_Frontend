import LocationList from './Contents';
import LocationSearchBox from './ContentSearchInput';
import {
  CancelButton,
  ModalContainer,
  ModalHeader,
  ModalWrapper,
} from './ContentSearchModal.styles';
import useSearchLocationList from '@/hooks/contents/useSearchContents';

interface LocationSearchModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ContentSearchModal = ({ setIsModalOpen }: LocationSearchModalProps) => {
  const { locationList, setLocationList, searchKeyword, setSearchKeyword } =
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
          <LocationList
            key={`key+${index}`}
            location={location}
            setLocationList={setLocationList}
          />
        ))}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default ContentSearchModal;
