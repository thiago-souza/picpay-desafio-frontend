import React from 'react';
import { Logo } from '@/components/logo';
import { HeaderStyle, BackIcon } from './header.style';
import backIcon from '@/assets/icons/back-icon.png';

export const Header: React.FC = () => {
  const [currentLocation, setCurrentLocation] = React.useState('/');

  React.useEffect(() => {
    setCurrentLocation(window.location.pathname);
    console.log('current: ', window.location.pathname);
  }, [window.location.pathname]);

  const backClick = () => {
    history.back();
  }

  return (
    <HeaderStyle>
      {/* {currentLocation != '/' && */}
      <BackIcon src={backIcon} onClick={backClick} />
      {/* } */}
      <Logo />
    </HeaderStyle >
  );
};