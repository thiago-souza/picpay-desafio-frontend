import * as React from 'react';
import { DocumentBox } from '@/components/document';
import { LabelDescription, LabelSubtitle } from '@/components/label';
import { ContentBox, ContentItems } from '@/pages/main/styles/content.style';
import { NavigationBack } from '@/components/navigation/navigation-back';

import RgPlasticIcon from '@/assets/icons/rg-plastic-icon.png';
import LightIcon from '@/assets/icons/light-icon.png';
import RgInstructionsIcon from '@/assets/icons/rg-instructions-icon.png';

interface IUploadBox {
  selectedDoc: string;
}

export const UploadInstructionsPage = ({ selectedDoc }: IUploadBox): JSX.Element => {

  const titleLabel = selectedDoc === 'CNH' ? 'Carteira de Motorista (CNH)' : 'Cédula de Identidade (RG)';

  return (
    <ContentItems>
      <NavigationBack />
      <LabelSubtitle>Envie as fotos da sua {titleLabel}</LabelSubtitle>
      <LabelDescription>
        Agora, é só seguir as instruções para enviar a foto do seu documento de
        identificação.
      </LabelDescription>
      <ContentBox>
        <DocumentBox icon={RgPlasticIcon}>
          Se possível, retire seu documento do plástico para evitar reflexos na
          foto.
        </DocumentBox>
        <DocumentBox icon={LightIcon}>
          Fotografe seu documento em um ambiente bem iluminado.
        </DocumentBox>
        <DocumentBox icon={RgInstructionsIcon}>
          O documento deve estar legível e centralizado na foto.
        </DocumentBox>
      </ContentBox>
    </ContentItems>
  );
};
