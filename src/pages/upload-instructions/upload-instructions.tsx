import * as React from 'react';
import { DocumentBox } from '@/components/document';
import { LabelDescription, LabelSubtitle } from '@/components/label';
import { ContentBox, ContentItems } from '@/components/content/content.style';
import RgPlasticIcon from '@/assets/icons/rg-plastic-icon.png';
import LightIcon from '@/assets/icons/light-icon.png';
import RgInstructionsIcon from '@/assets/icons/rg-instructions-icon.png';

export const UploadInstructionsPage: React.FC = () => {
  return (
    <ContentItems>
      <LabelSubtitle>Envie o documento que você escolheu</LabelSubtitle>
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
          O documento deve estar legível e centralizado na foto.
        </DocumentBox>
        <DocumentBox icon={RgInstructionsIcon}>
          Relaxa, seus dados estão seguros com a gente.
        </DocumentBox>
      </ContentBox>
    </ContentItems>
  );
};
