import * as React from 'react';
import { Modal } from '@/components/modal';
import { ContentButtons, ContentDescription, ContentTitle, ModalContent, ModalWrapper } from './modal-confirm.style';
import { ButtonLink } from '@/components/button';
import { CustomLink } from '@/components/link';

interface IModalConfirm {
  isShown?: boolean;
  callbackHide: () => void;
}

export const ModalConfirm: React.FC<IModalConfirm> = ({
  isShown = false,
  callbackHide,
}: IModalConfirm) => {
  const urlExpressDF = process.env.EXPRESS_DF;

  return (
    <Modal isShown={isShown} hide={callbackHide} showCloseButton={false}>
      <ModalWrapper>
        <ModalContent>
          <ContentTitle>Quer mesmo verificar sua identidade depois?</ContentTitle>
          <ContentDescription>
            Você só poderá adicionar saldo na sua carteira para participar das
            disputas do Cartola Express após verificar sua identidade.
          </ContentDescription>
        </ModalContent>
        <ContentButtons>
          <CustomLink callbackEvent={() => callbackHide()}>
            Verificar agora
          </CustomLink>
          <ButtonLink goToUrl={urlExpressDF}>Deixar para depois</ButtonLink>
        </ContentButtons>
      </ModalWrapper>
    </Modal >
  );
};
