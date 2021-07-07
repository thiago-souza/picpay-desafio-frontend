import React from 'react';
import ReactDOM from 'react-dom';
import { Wrapper, Header, StyledModal, CloseButton, Content, Backdrop } from './modal.style';

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
    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <Header>
            <CloseButton onClick={hide}>X</CloseButton>
          </Header>
          <Content>{children}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
