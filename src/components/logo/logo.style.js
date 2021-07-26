import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const LogoStyle = styled.div`
  width: 180px;

  @media ${device.mobileL} {
    width: 150px;
  }
`;
