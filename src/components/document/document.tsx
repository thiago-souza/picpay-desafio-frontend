import * as React from 'react';
import {
  DocumentBoxStyle,
  DocumentImgStyle,
  DocumentTextStyle,
} from './document.style';

interface IDocumentBox {
  icon: string;
  children: React.ReactNode;
}

export const DocumentBox = ({ icon, children }: IDocumentBox): JSX.Element => {
  const textLabel = children ? children : '';
  return (
    <DocumentBoxStyle>
      <DocumentImgStyle>
        <img src={icon} />
      </DocumentImgStyle>
      <DocumentTextStyle>{textLabel}</DocumentTextStyle>
    </DocumentBoxStyle>
  );
};
