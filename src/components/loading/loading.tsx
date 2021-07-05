import React from 'react';

interface Props {
  isShow: boolean;
  children: React.ReactNode;
}

import { ContainerLoading, BoxShadow, LoadingIcon } from './loading.style';
import { LabelCenter } from '@/components/label';

export const LoadingComponent: React.FC<Props> = ({
  isShow = false,
  children
}: Props) => {
  return isShow ? (
    <ContainerLoading>
      <BoxShadow>
        <LoadingIcon />
        <LabelCenter>{children}</LabelCenter>
      </BoxShadow>
    </ContainerLoading>
  ) : null;
};
