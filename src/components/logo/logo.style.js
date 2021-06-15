import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const LogoStyle = styled.div`
  width: 160px;

  @media ${device.desktop} {
    width: 110px;
  }
`;
