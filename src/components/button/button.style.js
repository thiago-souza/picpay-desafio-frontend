import styled from 'styled-components';

export const PrimaryButtonStyle = styled.div`
  button {
    max-width: 360px;
    width: 100%;
    height: 40px;

    background: ${(props) => props.theme.colors.orange};
    border: 0;
    border-radius: 4px;
    box-shadow: inset 0px -1.5px 0px rgba(0, 0, 0, 0.15);

    font-family: ${(props) => props.theme.fonts.proximaNovaBold};
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.tiny};
    :disabled {
      opacity: 0.5;
    }
  }
`;
