import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  AlertTitle,
  ButtonContainer,
  Button,
} from '@components/Common/AlertModal/AlertModal.styles';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const AlertModal = ({ isOpen, onClose, onConfirm, title }: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <AlertTitle>{title}</AlertTitle>
        <ButtonContainer>
          <Button $confirm onClick={onConfirm}>
            확인
          </Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AlertModal;
