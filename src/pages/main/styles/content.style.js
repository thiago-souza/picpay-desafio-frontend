import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const ContainerBox = styled.div`
  width: 90%;
  margin: 0 auto 5%;
  max-width: 627px;
  margin-bottom: 16px;

  @media ${device.tablet} {
    max-width: 627px;
    margin: 0 auto 32px auto;
    width: 100%;
  }
`;

export const ContentItems = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 627px;

  @media ${device.tablet} {
    max-width: 360px;
  }
`;

export const ContentBox = styled.div`
  margin: 32px auto 40px;
  width: 100%;

  @media ${device.tablet} {
    max-width: 360px;
  }
`;

export const ContentSideBar = styled.div`
  width: 100%;
  text-align: center;
`;
