import * as React from 'react';
import { PrimaryButtonStyle, LinkButtonStyle } from './button.style';

interface IButtonLink {
  disabled?: boolean;
  children: React.ReactNode;
  goToUrl?: string;
  onClickEvent?: () => void;
}

export const ButtonLink: React.FC<IButtonLink> = (props: IButtonLink) => {
  const { children, goToUrl = '#', onClickEvent } = props;

  const handleCallback = () => {
    if (onClickEvent)
      onClickEvent();
  }

  return (
    <PrimaryButtonStyle onClick={handleCallback}>
      <LinkButtonStyle href={goToUrl} title={goToUrl}>
        {children}
      </LinkButtonStyle>
    </PrimaryButtonStyle>
  );
};
