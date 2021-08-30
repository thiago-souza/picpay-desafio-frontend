import styled from 'styled-components';
import { device } from '@/pages/main/styles';

const LabelTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.proximaNovaBold};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.black};
  line-height: 2.125rem;

  margin: 0;
`;

const LabelSubtitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.proximaNovaBold};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
  line-height: 1.5rem;
`;

const LabelSubtitleButton = styled(LabelSubtitle)`
  display: flex;
  justify-content: center;
  background-color: transparent;

  font-size: ${(props) => props.theme.fontSizes.small};
  color: #666666;
  text-transform: none;

  &.tiny {
    font-family: ${(props) => props.theme.fonts.proximaNova};
    font-weight: normal;
  }
`;

const LabelCenter = styled(LabelSubtitle)`
  display: flex;
  justify-content: center;
`;

const LabelDescription = styled.p`
  font-family: ${(props) => props.theme.fonts.proximaNova};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
  line-height: ${(props) => props.theme.fontSizes.small};
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  line-height: 1.3rem;
  font-weight: ${(props) => (props.weight ? '700' : '400')};

  margin: 12px 0px;
`;

const LabelDescriptionButton = styled(LabelDescription)`
  color: #999;
  text-transform: none;
  background-color: transparent;

  &.error {
    color: ${(props) => props.theme.colors.red};
    text-align: center;
  }

  &.bold {
    color: #000000;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;

    @media ${device.tablet} {
      max-width: 250px;
    }
  }
`;

export {
  LabelTitle,
  LabelSubtitle,
  LabelDescription,
  LabelSubtitleButton,
  LabelDescriptionButton,
  LabelCenter,
};
