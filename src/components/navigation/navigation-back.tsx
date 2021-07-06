import * as React from 'react';
import { BackIcon } from './navigation.style';
import backIcon from '@/assets/icons/back-icon.png';

export const NavigationBack: React.FC = () => {
  const handleClick = () => {
    history.back();
  };
  return <BackIcon src={backIcon} onClick={handleClick} />;
};
