import * as React from 'react';
import { CustomButton } from '@/components/button';
import { DocumentCardBox } from '@/components/document';
import { LabelDescription, LabelSubtitle } from '@/components/label';
import { ContentBox, ContentItems } from '@/components/content/content.style';
import RgIcon from '@/assets/icons/rg-only-icon.png';
import CpfIcon from '@/assets/icons/cpf-only-icon.png';
import CnhIcon from '@/assets/icons/cnh-only-icon.png';
import RneIcon from '@/assets/icons/rne-only-icon.png';
import { useState } from 'react';

interface IDocumentSelectionPage {
  goToPageCallback: (n: number) => void;
  selectedCallback: (t: string) => void;
}

export const DocumentSelectionPage: React.FC<IDocumentSelectionPage> = (
  props: IDocumentSelectionPage,
) => {
  const { goToPageCallback, selectedCallback } = props;
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSelectionCallback = (t: string) => {
    if (t.length > 1) {
      setIsDisabled(false);
    }
    selectedCallback(t);
  };

  return (
    <ContentItems>
      <LabelSubtitle>Escolha o documento que você vai enviar:</LabelSubtitle>
      <LabelDescription>
        Olha, lembre-se que a foto deve ser do seu documento original.
      </LabelDescription>
      <ContentBox>
        <DocumentCardBox
          callbackEvent={() => handleSelectionCallback('RG')}
          icon={RgIcon}
        >
          RG
        </DocumentCardBox>
        <DocumentCardBox
          callbackEvent={() => handleSelectionCallback('CPF')}
          icon={CpfIcon}
        >
          CPF
        </DocumentCardBox>
        <DocumentCardBox
          callbackEvent={() => handleSelectionCallback('CNH')}
          icon={CnhIcon}
        >
          CNH
        </DocumentCardBox>
        <DocumentCardBox
          callbackEvent={() => handleSelectionCallback('RNE')}
          icon={RneIcon}
        >
          RNE
        </DocumentCardBox>
      </ContentBox>
      <CustomButton
        disabled={isDisabled}
        callbackEvent={() => goToPageCallback(2)}
      >
        Continuar
      </CustomButton>
    </ContentItems>
  );
};
