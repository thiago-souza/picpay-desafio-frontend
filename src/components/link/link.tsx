import * as React from 'react';
import { LinkDescription } from './link.style';

interface ILink {
  callbackEvent: () => void;
  children?: React.ReactNode;
}

export const CustomLink: React.FC<ILink> = ({
  callbackEvent,
  children,
}: ILink) => {
  const onEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    callbackEvent && callbackEvent();
  };
  return (
    <LinkDescription>
      <div onClick={onEventClick}>{children}</div>
    </LinkDescription>
  );
};
