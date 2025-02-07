import React, { useEffect, useState } from 'react';
import { PanInfo } from 'framer-motion';
import {
  BottomSheetWrapper,
  BottomSheetHeader,
  DragHandle,
  BottomSheetFooter,
  Title,
  StyledMotion,
  ContentContainer,
} from './CharacterBottomSheet.styles';

export interface CommonBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  selectedCharacter?: string | null; // 현재 선택된 캐릭터 추가
}

const CharacterBottomSheet: React.FC<CommonBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
  selectedCharacter,
}) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // 선택된 캐릭터가 변경될 때 버튼 보이기
  useEffect(() => {
    if (selectedCharacter) {
      setIsButtonVisible(true);
    }
  }, [selectedCharacter]);

  const handleDragEnd = (event: TouchEvent | MouseEvent, info: PanInfo) => {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.offset.y > 200);
    if (shouldClose) {
      onClose();
    }
  };

  return (
    <BottomSheetWrapper>
      <StyledMotion
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ overflowY: 'auto' }} // 스크롤 활성화
      >
        <BottomSheetHeader>
          <DragHandle />
          {title && <Title>{title}</Title>}
        </BottomSheetHeader>

        <ContentContainer>{children}</ContentContainer>

        {footerContent && (
          <BottomSheetFooter
            style={{ display: isButtonVisible ? 'block' : 'none' }}
          >
            {footerContent}
          </BottomSheetFooter>
        )}
      </StyledMotion>
    </BottomSheetWrapper>
  );
};

export default CharacterBottomSheet;
