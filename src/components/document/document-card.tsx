import * as React from 'react';
import {
  DocumentCardBoxStyleButton,
  DocumentCardImgStyle,
  DocumentTextStyle,
  DocumentLabelStyle,
  DocumentCardTextStyle,
  DocumentTextIconStyle,
} from './document.style';

import FastIcon from '@/assets/icons/fast-icon.png';
import { theme } from '@/pages/main/styles';

interface IDocumentBox {
  icon: string;
  children: React.ReactNode;
  label?: string;
  fastIcon?: boolean;
  textColor?: string;
  disabled?: boolean;
  callbackEvent?: () => void;
}

export const DocumentCardBox = ({
  icon,
  children,
  label,
  fastIcon = false,
  textColor = theme.colors.black,
  disabled = false,
  callbackEvent,
}: IDocumentBox): JSX.Element => {
  const onEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    callbackEvent && callbackEvent();
  };

  const textChild = children ? children : '';
  const textLabel = label ? label : '';
  return (
    <DocumentCardBoxStyleButton onClick={onEventClick} disabled={disabled}>
      <DocumentCardImgStyle>
        <img src={icon} />
      </DocumentCardImgStyle>
      <DocumentCardTextStyle>
        <DocumentTextStyle>{textChild}</DocumentTextStyle>
        {label && (
          <DocumentTextIconStyle>
            {fastIcon && <img src={FastIcon} />}
            <DocumentLabelStyle textColor={textColor}>{textLabel}</DocumentLabelStyle>
          </DocumentTextIconStyle>
        )}
      </DocumentCardTextStyle>
    </DocumentCardBoxStyleButton>
  );
};
