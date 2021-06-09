import * as React from 'react';
import { PrimaryButtonStyle } from './button.style';

interface ICustomButton {
  callbackEvent: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const CustomButton: React.FC<ICustomButton> = (props: ICustomButton) => {
  const { children, callbackEvent, disabled = false } = props;

  const onEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    callbackEvent && !disabled && callbackEvent();
  };

  return (
    <PrimaryButtonStyle>
      <button disabled={disabled} onClick={onEventClick}>
        {children}
      </button>
    </PrimaryButtonStyle>
  );
};
