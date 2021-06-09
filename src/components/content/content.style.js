import styled from 'styled-components';
import { device } from '../../pages/main/styles';

export const ContentContainer = styled.div`
  width: 90%;
  margin: 0 auto 0 5%;

  @media ${device.tablet} {
    max-width: 360px;
    margin: 0 auto;
  }

  @media ${device.desktop} {
    width: 100%;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-flow: column;
  margin: 32px 0px 40px;
`;
