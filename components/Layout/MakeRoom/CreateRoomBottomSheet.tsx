import useBottomSheet from '@/hooks/bottomSheet/useBottomSheet';
import {
  BackgroundOverlay,
  BottomSheetWrapper,
  ContentWrapper,
  HeaderHandler,
  HeaderWrapper,
  StyledTitle,
} from '@/components/Layout/MakeRoom/CreateRoomBottomSheet.styles';
import RoomTitleInput from './RoomTitleInput';
import NumSelectForm from './NumSelectForm';

interface CreateRoomBottomSheetProps {
  isOpen: boolean;
  setIsOpen: () => void;
  onRoomTitleChange: (title: string) => void;
  onTotalRoundsChange: (rounds: number) => void;
}

const CreateRoomBottomSheet = ({
  isOpen,
  setIsOpen,
  onRoomTitleChange,
  onTotalRoundsChange,
}: CreateRoomBottomSheetProps) => {
  const { isExpand, onDragEnd } = useBottomSheet({
    setIsOpen,
  });

  return (
    <>
      <BackgroundOverlay $isOpen={isOpen} onClick={setIsOpen} />
      <BottomSheetWrapper
        $isExpand={isExpand}
        animate={{ y: isOpen ? '0%' : '100%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween' }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
      >
        <HeaderWrapper>
          <HeaderHandler />
        </HeaderWrapper>
        <ContentWrapper>
          <StyledTitle>방 만들기</StyledTitle>
          <RoomTitleInput
            placeholder="방 제목을 입력해주세요"
            label="방 제목 설정"
            onChange={(e) => onRoomTitleChange(e.target.value)}
          />
          <NumSelectForm
            label="라운드 (최대 3라운드)"
            maxValue={3}
            onChange={onTotalRoundsChange}
          />
          <RoomTitleInput
            placeholder="1분 (변경불가)"
            label="타이머"
            variant="readonly"
          />
        </ContentWrapper>
      </BottomSheetWrapper>
    </>
  );
};

export default CreateRoomBottomSheet;
