import useBottomSheet from '@/hooks/bottomSheet/useBottomSheet';
import {
  BackgroundOverlay,
  BottomSheetWrapper,
  ContentWrapper,
  HeaderHandler,
  HeaderWrapper,
} from './BottomSheet.styles';

interface BottomSheetProps {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomSheet = ({ children, setIsOpen }: BottomSheetProps) => {
  const { isExpand, onDragEnd } = useBottomSheet({
    setIsOpen,
  });

  return (
    <>
      <BackgroundOverlay initial={{ x: '-50%' }} />
      <BottomSheetWrapper
        $isExpand={isExpand}
        initial={{ x: '-50%' }}
        animate={{ y: '0%' }}
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
        <ContentWrapper>{children}</ContentWrapper>
      </BottomSheetWrapper>
    </>
  );
};

export default BottomSheet;
