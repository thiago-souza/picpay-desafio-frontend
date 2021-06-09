import * as React from 'react';
import { LabelTitle, LabelSubtitle, LabelDescription } from './label.style';

interface ILabel {
  type: string;
  bold: boolean;
  children?: React.ReactNode;
}

export const Label: React.ReactNode = ({
  type = 'description',
  bold = false,
  children,
}: ILabel) => {
  const title = <LabelTitle>{children}</LabelTitle>;
  const subTitle = <LabelSubtitle>{children}</LabelSubtitle>;
  const description = <LabelDescription>{children}</LabelDescription>;
  const renderLabel = () => {
    if (type === 'title') {
      return title;
    } else if (type === 'sub') {
      return subTitle;
    } else {
      return description;
    }
  };

  return renderLabel();
};
