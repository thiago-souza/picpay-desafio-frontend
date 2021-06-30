import * as React from 'react';
import { CustomButton } from '@/components/button';
import { LabelDescription, LabelTitle, LabelCenter } from '@/components/label';
import {
  ContentBox,
  ContentItems,
  ContentSideBar,
} from '@/pages/main/styles/content.style';
import ApprovedIcon from '@/assets/icons/approved-icon.png';
import { useParams } from 'react-router-dom';
import {
  LabelTitleCentered,
  LabelDescriptionCentered,
  LabelDescBoxCentered,
} from './status.style';

export const StatusPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  const handleCallBack = () => {
    alert('Em construção');
  };

  const renderApproved = (
    <>
      <LabelCenter>
        <img src={ApprovedIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitleCentered>
          Pronto! Tudo certo com suas informações
        </LabelTitleCentered>
        <LabelDescriptionCentered>
          Você jé pode fazer transações para participar dos desafios do game.
          Divirta-se!
        </LabelDescriptionCentered>
      </ContentBox>
    </>
  );

  const renderInProcess = (
    <>
      <LabelCenter>
        <img src={ApprovedIcon} />
      </LabelCenter>
      <LabelTitleCentered>
        Enviado! Aguarde a verificação das suas informações.
      </LabelTitleCentered>
      <LabelDescBoxCentered>
        Agora que você enviou as fotas, Vamos verificar suas informações.
        Fique de olho no seu e-mail, em algumas horas te enviaremos um retorno
      </LabelDescBoxCentered>
      <LabelDescriptionCentered>
        Vamos enviar um e-mail para <b>email@email.com</b>
        assim que tivermos novas informações.
      </LabelDescriptionCentered>
    </>
  );

  const renderRejected = (
    <>
      <LabelCenter>
        <img src={ApprovedIcon} />
      </LabelCenter>
      <LabelTitle>
        Opa, precisamos que você envie
        fotos do seu documento
        novamente.
      </LabelTitle>
      <LabelDescription>
        A foto do documento enviado está ilegível.
        Precisamos que você faça o envio novamente.
      </LabelDescription>
    </>
  );

  const renderSuspected = (
    <>
      <LabelCenter>
        <img src={ApprovedIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitle>
          Poxa, você não pode entrar em
          campo...
        </LabelTitle>
        <LabelDescription>
          Identificamos pendências em seu nome, e para
          jogar Cartola Express é preciso regularizar
          sua situação.
        </LabelDescription>
      </ContentBox>
    </>
  );

  const renderError = (
    <>
      <LabelCenter>
        <img src={ApprovedIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitle>
          Ops! Isso não deveria ter
          acontecido.
        </LabelTitle>
        <LabelDescription>
          Por favor, tente novamente. Se o problema
          persistir, entre em contato com o nosso
          antendimento.
        </LabelDescription>
      </ContentBox>
    </>
  );

  const renderTypeStatus = () => {
    switch (type.toUpperCase()) {
      case 'IN_PROCESS':
        return renderInProcess;
      case 'APPROVED':
        return renderApproved;
      case 'SUSPECTED':
        return renderSuspected;
      case 'REJECTED':
        return renderRejected;
      case 'ERROR':
        return renderError;
      default:
        return renderError;
    }
  };

  return (
    <ContentItems>
      {renderTypeStatus()}
      <ContentSideBar>
        <CustomButton callbackEvent={handleCallBack}>Continuar</CustomButton>
      </ContentSideBar>
    </ContentItems>
  );
};
