import * as React from 'react';
import { LinkDescription } from './link.style';

interface ILink {
  callbackEvent: () => void;
  children?: React.ReactNode;
  tiny?: boolean;
}

export const CustomLink: React.FC<ILink> = ({
  callbackEvent,
  children,
  tiny,
}: ILink) => {
  const onEventClick = () => {
    callbackEvent && callbackEvent();
  };
  return (
    <LinkDescription className={`${tiny ? `tiny` : ''}`}>
      <div data-testid="btn-custom-link" onClick={onEventClick}>{children}</div>
    </LinkDescription>
  );
};
