import styled from 'styled-components';

export const LinkDescription = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  font-family: ${(props) => props.theme.fonts.proximaNovaBold};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.orange};
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }

  &.tiny {
    text-transform: initial;
    font-family: ${(props) => props.theme.fonts.proximaNova};
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;
