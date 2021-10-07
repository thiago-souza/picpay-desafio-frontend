import React from 'react';
import { ModalContainer, Wrapper, CloseButton, Content, Backdrop } from './modal.style';

export interface ModalProps {
  isShown?: boolean;
  showCloseButton?: boolean;
  hide?: () => void;
  children: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({
  isShown = false,
  showCloseButton = true,
  hide,
  children,
}: ModalProps) => {

  return (
    <ModalContainer data-testid="modal-confirm" className={` ${isShown ? "show" : "hide"}`}>
      <Backdrop />
      <Wrapper>
        {showCloseButton && <CloseButton onClick={hide}>X</CloseButton>}
        <Content>{children}</Content>
      </Wrapper>
    </ModalContainer>
  )
};
