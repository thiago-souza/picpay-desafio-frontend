import * as React from 'react';
import {
  DocumentBoxStyle,
  DocumentImgStyle,
  DocumentTextStyle,
} from './document.style';

interface IDocumentBox {
  icon: string;
  light?: boolean;
  children: React.ReactNode;
  tiny?: boolean;
}

export const DocumentBox = ({
  icon,
  children,
  light = false,
  tiny,
}: IDocumentBox): JSX.Element => {
  const textLabel = children ? children : '';
  return (
    <DocumentBoxStyle>
      <DocumentImgStyle>
        <img src={icon} />
      </DocumentImgStyle>
      <DocumentTextStyle
        className={`${light ? 'light' : ''} ${tiny && 'tiny'}`}
      >
        {textLabel}
      </DocumentTextStyle>
    </DocumentBoxStyle>
  );
};
