import styled from 'styled-components';

export const BottomSheetWrapper = styled.div`
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
`;

export const BottomSheetHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: white;
`;

export const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #e2e2e2;
  border-radius: 2px;
  margin: 0 auto 12px;
`;

export const BottomSheetFooter = styled.div`
  padding: 16px;
  background-color: white;
  border-top: 1px solid #eee;
`;
