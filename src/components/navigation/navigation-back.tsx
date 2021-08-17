import * as React from 'react';
import { BackIcon } from './navigation.style';
import backIcon from '@/assets/icons/back-icon.png';

interface INavigationBack {
  onClickEvent?: () => void;
}

export const NavigationBack = ({ onClickEvent }: INavigationBack): JSX.Element => {
  const handleClick = () => {
    if (onClickEvent) {
      onClickEvent();
    }

    history.back();
  };
  return <BackIcon src={backIcon} onClick={handleClick} />;
};
