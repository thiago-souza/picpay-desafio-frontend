import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton } from '@/components/button';
import { DocumentCardBox } from '@/components/document';
import { LabelDescription, LabelSubtitle } from '@/components/label';
import { ContentBox, ContentItems } from '@/pages/main/styles/content.style';
import RgIcon from '@/assets/icons/rg-only-icon.png';
import CnhIcon from '@/assets/icons/cnh-only-icon.png';

interface IDocumentSelectionPage {
  selectedDoc: string;
  selectedCallback: (t: string) => void;
}

export const DocumentSelectionPage: React.FC<IDocumentSelectionPage> = (
  props: IDocumentSelectionPage,
) => {
  const history = useHistory();
  const { selectedDoc, selectedCallback } = props;

  return (
    <ContentItems>
      <LabelSubtitle>Escolha o documento que você vai enviar:</LabelSubtitle>
      <LabelDescription>
        Olha, lembre-se que a foto deve ser do seu documento original.
      </LabelDescription>
      <ContentBox>
        <DocumentCardBox
          callbackEvent={() => selectedCallback('RG')}
          icon={RgIcon}
        >
          RG
        </DocumentCardBox>
        <DocumentCardBox
          callbackEvent={() => selectedCallback('CNH')}
          icon={CnhIcon}
        >
          CNH
        </DocumentCardBox>
      </ContentBox>
      <CustomButton
        disabled={selectedDoc === ''}
        callbackEvent={() => history.push('upload')}
      >
        Continuar
      </CustomButton>
    </ContentItems>
  );
};
