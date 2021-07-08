import * as React from 'react';
import { PrimaryButtonStyle, LinkButtonStyle } from './button.style';

interface IButtonLink {
  disabled?: boolean;
  children: React.ReactNode;
  goToUrl?: string;
}

export const ButtonLink: React.FC<IButtonLink> = (props: IButtonLink) => {
  const { children, goToUrl = '#' } = props;

  return (
    <PrimaryButtonStyle>
      <LinkButtonStyle href={goToUrl} title={goToUrl}>
        {children}
      </LinkButtonStyle>
    </PrimaryButtonStyle>
  );
};
