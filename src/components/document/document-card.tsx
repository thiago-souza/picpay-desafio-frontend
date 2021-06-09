import * as React from 'react';
import {
  DocumentCardBoxStyle,
  DocumentCardImgStyle,
  DocumentTextStyle,
} from './document.style';

interface IDocumentBox {
  icon: string;
  children: React.ReactNode;
  callbackEvent: () => void;
}

export const DocumentCardBox = ({
  icon,
  children,
  callbackEvent,
}: IDocumentBox): JSX.Element => {
  const onEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    callbackEvent && callbackEvent();
  };

  const textLabel = children ? children : '';
  return (
    <DocumentCardBoxStyle onClick={onEventClick}>
      <DocumentCardImgStyle>
        <img src={icon} />
      </DocumentCardImgStyle>
      <DocumentTextStyle>{textLabel}</DocumentTextStyle>
    </DocumentCardBoxStyle>
  );
};
