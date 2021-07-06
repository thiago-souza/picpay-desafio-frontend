import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const BackIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;

  position: absolute;
  top: 16px;
  left: 18px;

  @media ${device.tablet} {
    top: 36px;
    left: 25%;
  }

  @media ${device.desktop} {
    left: 30%;
  }
`;
