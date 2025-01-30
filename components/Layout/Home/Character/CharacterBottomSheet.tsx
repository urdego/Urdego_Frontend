import React from 'react';
import { PanInfo } from 'framer-motion';
import {
  BottomSheetWrapper,
  BottomSheetHeader,
  DragHandle,
  BottomSheetFooter,
  Title,
  StyledMotion,
} from './CharacterBottomSheet.styles';

export interface CommonBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const CharacterBottomSheet: React.FC<CommonBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
}) => {
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
      >
        <BottomSheetHeader>
          <DragHandle />
          {title && <Title>{title}</Title>}
        </BottomSheetHeader>

        {children}

        {footerContent && (
          <BottomSheetFooter>{footerContent}</BottomSheetFooter>
        )}
      </StyledMotion>
    </BottomSheetWrapper>
  );
};

export default CharacterBottomSheet;
