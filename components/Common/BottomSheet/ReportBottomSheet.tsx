import React from 'react';
import { PanInfo } from 'framer-motion';
import {
  BottomSheetWrapper,
  BottomSheetHeader,
  DragHandle,
  BottomSheetFooter,
  ReportCheckList,
  ReportCheckItem,
  ReportCheckItemTitle,
  Title,
  StyledCheckIcon,
  StyledNonCheckIcon,
  StyledMotion,
} from './ReportBottomSheet.styles';
import Button from '@/components/Common/Button/Button';

export interface ReportBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportType: number) => void;
}

// 신고 항목 리스트
const reportItems = ['광고 및 스팸', '부적절한 장소 및 사진', '거짓 정보'];

const ReportBottomSheet: React.FC<ReportBottomSheetProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = () => {
    if (selectedItem !== null) {
      onSubmit(selectedItem);
      onClose();
    }
  };

  // 단일 선택을 위해 number 타입의 state로 변경
  const [selectedItem, setSelectedItem] = React.useState<number | null>(null);

  // 선택 항목을 변경하는 함수
  const handleSelect = (index: number) => {
    setSelectedItem(index === selectedItem ? null : index);
  };

  const handleDragEnd = (event: TouchEvent | MouseEvent, info: PanInfo) => {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.offset.y > 200);
    if (shouldClose) {
      onClose();
    }
  };

  return (
    <StyledMotion
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? '0%' : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      dragMomentum={false}
    >
      <BottomSheetWrapper>
        <BottomSheetHeader>
          <DragHandle />
          <Title>신고하기</Title>
        </BottomSheetHeader>

        {/* 신고 항목 리스트 */}
        <ReportCheckList>
          {reportItems.map((item, index) => (
            <ReportCheckItem
              key={index}
              onClick={() => handleSelect(index)}
              style={{ cursor: 'pointer' }}
            >
              <ReportCheckItemTitle>{item}</ReportCheckItemTitle>
              {selectedItem === index ? (
                <StyledCheckIcon />
              ) : (
                <StyledNonCheckIcon />
              )}
            </ReportCheckItem>
          ))}
        </ReportCheckList>

        <BottomSheetFooter>
          <Button
            label="취소하기"
            buttonSize="small"
            styleType="whiteBackground"
            onClick={onClose}
          />
          <Button
            label="신고하기"
            buttonSize="small"
            styleType="coloredBackground"
            onClick={handleSubmit}
            disabled={selectedItem === null}
          />
        </BottomSheetFooter>
      </BottomSheetWrapper>
    </StyledMotion>
  );
};

export default ReportBottomSheet;
