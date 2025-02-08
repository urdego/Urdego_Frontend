import useBottomSheet from '@/hooks/bottomSheet/useBottomSheet';
import {
  BackgroundOverlay,
  BottomSheetWrapper,
  ContentWrapper,
  HeaderHandler,
  HeaderWrapper,
} from './BottomSheet.styles';

type InitHeightProps = 'long' | 'short';
interface BottomSheetProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initHeight?: InitHeightProps;
}

const BottomSheet = ({
  children,
  isOpen = true,
  setIsOpen,
  initHeight = 'short',
}: BottomSheetProps) => {
  const { isExpand, onDragEnd } = useBottomSheet({
    setIsOpen,
  });

  return (
    <>
      <BackgroundOverlay
        $isOpen={isOpen}
        initial={{ x: '-50%' }}
        onClick={() => setIsOpen(false)}
      />
      <BottomSheetWrapper
        $isExpand={isExpand}
        $initHeight={initHeight}
        initial={{ x: '-50%', y: '100%' }}
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
        <ContentWrapper>{children}</ContentWrapper>
      </BottomSheetWrapper>
    </>
  );
};

export default BottomSheet;
