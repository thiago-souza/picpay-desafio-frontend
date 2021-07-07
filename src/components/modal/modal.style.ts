import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 700;
  outline: 0;

  img {
    width: 100%;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 500;
`;

export const CloseButton = styled.button`
  font-size: 1rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  margin-left: auto;
  position: absolute;
  top: -30px;
  right: 0;
  color: #ffffff;

  :hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 80%;
  height: 60%;
  background: #c4c4c4;
  border-radius: 4px;

  @media ${device.tablet} {
    min-width: 480px;
    min-height: 380px;
    margin: 0 auto;
  }
`;
