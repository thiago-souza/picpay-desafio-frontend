import React from 'react';
import ReactDOM from 'react-dom';
import { Wrapper, CloseButton, Content, Backdrop } from './modal.style';

export interface ModalProps {
  isShown?: boolean;
  hide?: () => void;
  children: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({
  isShown = false,
  hide,
  children,
}: ModalProps) => {

  const modal = (
    <>
      <Backdrop />
      <Wrapper>
        <CloseButton onClick={hide}>X</CloseButton>
        <Content>{children}</Content>
      </Wrapper>
    </>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
