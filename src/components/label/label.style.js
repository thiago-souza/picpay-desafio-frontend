import styled from 'styled-components';

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

const LabelDescription = styled.p`
  font-family: ${(props) => props.theme.fonts.proximaNova};
  font-size: ${(props) => props.theme.fontSizes.small};
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

export { LabelTitle, LabelSubtitle, LabelDescription };
