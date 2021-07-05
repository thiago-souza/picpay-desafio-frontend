import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const HeaderStyle = styled.header`
  display: flex;
  width: 100vw;
  height: 90px;
  padding-top: 16px;

  border-top: 8px solid ${(props) => props.theme.colors.orange};

  justify-content: center;
  position: relative;
`;

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