import React from 'react';

interface Props {
  isShow: boolean;
}

import { ContainerLoading, BoxShadow, LoadingIcon } from './loading.style';
import { LabelCenter } from '@/components/label';

export const LoadingComponent: React.FC<Props> = ({
  isShow = false,
}: Props) => {
  return isShow ? (
    <ContainerLoading>
      <BoxShadow>
        <LoadingIcon />
        <LabelCenter>Enviando informações...</LabelCenter>
      </BoxShadow>
    </ContainerLoading>
  ) : null;
};
