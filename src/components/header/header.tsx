import React from 'react';
import { Logo } from '@/components/logo';
import { HeaderStyle } from './header.style';

export const Header: React.FC = () => {
  return (
    <HeaderStyle>
      <Logo />
    </HeaderStyle>
  );
};
