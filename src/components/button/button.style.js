import styled from 'styled-components';
import { device } from '@/pages/main/styles';

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
      cursor: not-allowed;
      color: #999999;
      background: #cccccc;
    }
  }
`;

export const UploadButtonStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  max-width: 579px;
  width: 100%;
  height: 76px;
  margin-top: 16px;
  position: relative;

  background: ${(props) => props.theme.colors.white};
  border: 1px dashed #d5d5d5;
  border-radius: 6px;

  font-family: ${(props) => props.theme.fonts.proximaNovaBold};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.tiny};

  @media ${device.tablet} {
    height: 96px;
  }

  input {
    display: none;
  }

  label {
    cursor: pointer;
  }
`;
