import styled from 'styled-components';

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

  background: rgba(0, 0, 0, 0.9);

  h3 {
    margin-top: 32px;
    color: ${(props) => props.theme.colors.white};
  }
`;

const LoadingIcon = styled.div`
  border: 5px solid rgba(0, 0, 0, 0.2);
  border-top: 5px solid ${(props) => props.theme.colors.white};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export { ContainerLoading, BoxShadow, LoadingIcon };
