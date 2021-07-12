import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const ModalWrapper = styled.div`
  background: #ffffff;
  padding: 16px;
  border-radius: 4px;
  font-family: ${(props) => props.theme.fonts.proximaNova};
  text-align: initial;
  
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const ContentTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.black};
  align-items: flex-start;
  margin-bottom: 32px;
`;

export const ContentDescription = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.grey};
`;

export const ContentButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  text-align: center;

  & > div {
    font-size: ${(props) => props.theme.fontSizes.medium};
    margin-top: 0px;
    padding: 0px 25px;
    height: 40px;
  }

  a {
    font-size: ${(props) => props.theme.fontSizes.medium};
    padding: 0px 10px;
  }

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-around;
  }
`;

