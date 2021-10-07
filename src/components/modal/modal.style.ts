import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const ModalContainer = styled.div`
  display: none;

  &.show {
    display: flex;
  }
`
export const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 10;
  outline: 0;

  img {
    width: 80%;
    padding: 20px;
  }

  p {
    color: #ffffff;
    text-align: center;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 5;
`;

export const CloseButton = styled.button`
  font-size: 1.5rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  margin-left: auto;
  background: none;
  position: absolute;
  color: #ffffff;
  top: -30px;
  right: 3px;

  @media ${device.tablet} {
    font-size: 1rem;
    right: 0px;
  }

  :hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  padding: 10px;
  height: 60%;
  min-width: 85vw;

  @media ${device.tablet} {
    width: 80%;
    min-width: 480px;
    min-height: 380px;
    margin: 0 auto;
  }
`;

export const ModalStylePreview = styled.div`
  width: 100%;
  height: 100%;
  background: #c4c4c4;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 4px;
`;

export const ModalContent = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 4px;
`;
