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
  const onEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    callbackEvent && callbackEvent();
  };
  return (
    <LinkDescription className={`${tiny ? `tiny` : ''}`}>
      <div onClick={onEventClick}>{children}</div>
    </LinkDescription>
  );
};
