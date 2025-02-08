import { DeleteIcon } from '@/components/Layout/PlaceRegister/PlaceRegisterIcon';
import {
  IconLayout,
  ModalContainer,
  ModalHeader,
  ModalWrapper,
} from './TipModal.styles';

interface TipModalProps {
  setIsTipOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TipModal = ({ setIsTipOpen }: TipModalProps) => {
  return (
    <ModalWrapper>
      <ModalHeader>
        <span>장소 자동 등록하는 방법</span>
        <IconLayout onClick={() => setIsTipOpen(false)}>
          <DeleteIcon width={8.4} />
        </IconLayout>
      </ModalHeader>
      <ModalContainer>
        <p>
          &middot; 설정 &gt; 개인정보 보호 및 보안 &gt; 위치 서비스 &gt;
          카메라와 어데고?! 앱을 사용하는 동안으로 변경
        </p>
        <p>
          &middot; 설정 &gt; 개인정보 보호 및 보안 &gt; 사진 &gt; 어데고?! &gt;
          전체접근으로 변경
        </p>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default TipModal;
