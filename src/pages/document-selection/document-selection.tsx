import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { DocumentCardBox } from '@/components/document';
import { LabelDescription, LabelSubtitle } from '@/components/label';
import { ContentBox, ContentItems } from '@/pages/main/styles/content.style';
import { NavigationBack } from '@/components/navigation/navigation-back';

import RgIcon from '@/assets/icons/rg-only-icon.png';
import CnhIcon from '@/assets/icons/cnh-only-icon.png';

interface IDocumentSelectionPage {
  selectedDoc?: string;
  selectedCallback: (t: string) => void;
}

export const DocumentSelectionPage: React.FC<IDocumentSelectionPage> = (
  props: IDocumentSelectionPage,
) => {
  const history = useHistory();
  const { selectedCallback } = props;

  const handleSelectCallback = (selectedFile: string) => {
    selectedCallback(selectedFile);
    history.push('upload');
  };

  return (
    <ContentItems>
      <NavigationBack />
      <LabelSubtitle>Escolha o documento que você vai enviar:</LabelSubtitle>
      <LabelDescription>
        Olha, lembre-se que a foto deve ser do seu documento original.
      </LabelDescription>
      <ContentBox>
        <DocumentCardBox
          callbackEvent={() => handleSelectCallback('CNH')}
          icon={CnhIcon}
          label={'Análise mais rápida (até 1 min)'}
        >
          CNH
        </DocumentCardBox>
        <DocumentCardBox
          callbackEvent={() => handleSelectCallback('RG')}
          icon={RgIcon}
        >
          RG
        </DocumentCardBox>
      </ContentBox>
    </ContentItems>
  );
};
