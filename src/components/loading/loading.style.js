import styled from 'styled-components';
import { device } from '@/pages/main/styles';

const ContainerLoading = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;

  overflow: hidden;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const BoxShadow = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.8);

  h3 {
    margin-top: 32px;
    color: ${(props) => props.theme.colors.white};

    @media ${device.tablet} {
      font-family: ${(props) => props.theme.fonts.proximaNova};
      font-weight: normal;
    }
  }
`;

const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
  padding: 0.6rem;
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  margin-top: -3rem;

  span {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #c05724;
    animation-name: splash-screen-loading-disc-animation;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
    animation-play-state: running;

    &:nth-child(2) {
      animation-delay: 0.2s;
      animation-duration: 0.6s;
      margin-left: 0.625rem;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
      animation-duration: 0.6s;
      margin-left: 0.625rem;
    }
  }

  @keyframes splash-screen-loading-disc-animation {
    0% {
      background-color: #c05724;
    }
    50% {
      background-color: #ff7400;
    }
    100% {
      background-color: #ff9338;
    }
  }
`;

export { ContainerLoading, BoxShadow, LoadingIcon };
