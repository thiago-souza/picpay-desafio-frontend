import * as React from 'react';
import {
  DocumentCardBoxStyle,
  DocumentCardImgStyle,
  DocumentTextStyle,
  DocumentLabelStyle,
  DocumentCardTextStyle,
  DocumentTextIconStyle,
} from './document.style';

import FastIcon from '@/assets/icons/fast-icon.png';

interface IDocumentBox {
  icon: string;
  children: React.ReactNode;
  label?: string;
  callbackEvent: () => void;
}

export const DocumentCardBox = ({
  icon,
  children,
  label,
  callbackEvent,
}: IDocumentBox): JSX.Element => {
  const onEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    callbackEvent && callbackEvent();
  };

  const textChild = children ? children : '';
  const textLabel = label ? label : '';
  return (
    <DocumentCardBoxStyle onClick={onEventClick}>
      <DocumentCardImgStyle>
        <img src={icon} />
      </DocumentCardImgStyle>
      <DocumentCardTextStyle>
        <DocumentTextStyle>{textChild}</DocumentTextStyle>
        {label && (
          <DocumentTextIconStyle>
            <img src={FastIcon} />
            <DocumentLabelStyle>{textLabel}</DocumentLabelStyle>
          </DocumentTextIconStyle>
        )}
      </DocumentCardTextStyle>
    </DocumentCardBoxStyle>
  );
};
