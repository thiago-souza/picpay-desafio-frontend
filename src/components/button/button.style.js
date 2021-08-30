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

export const LinkButtonStyle = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 360px;
  width: 100%;
  height: 40px;

  background: ${(props) => props.theme.colors.orange};
  border: 0;
  border-radius: 4px;
  box-shadow: inset 0px -1.5px 0px rgba(0, 0, 0, 0.15);

  text-decoration: none;
  font-family: ${(props) => props.theme.fonts.proximaNovaBold};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.tiny};
  cursor: pointer;
`;

export const UploadButtonDragNDrop = styled.div`
  border: 1px dashed #d5d5d5;
  border-radius: 6px;
  margin-bottom: 16px;

  &first-child {
    margin-top: 16px;
  }
`;

export const UploadButtonStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 579px;
  width: 100%;
  height: 76px;
  position: relative;

  background: inherit;
  border: 1px dashed inherit;
  border-radius: 6px;

  font-family: ${(props) => props.theme.fonts.proximaNovaBold};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.tiny};

  @media ${device.tablet} {
    height: 96px;
    justify-content: space-around;
  }

  input {
    display: none;
  }

  label {
    cursor: pointer;
    &.trim {
      h3,
      p {
        margin-bottom: 0;
      }
    }
  }
`;
