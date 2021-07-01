import * as React from 'react';
import { CustomButton } from '@/components/button';
import { LabelCenter } from '@/components/label';
import {
  ContentBox,
  ContentItems,
  ContentSideBar,
} from '@/pages/main/styles/content.style';
import InProcessIcon from '@/assets/icons/inprocess-icon.png';
import ApprovedIcon from '@/assets/icons/approved-icon.png';
import SuspectedIcon from '@/assets/icons/suspected-icon.png';
import RejectedIcon from '@/assets/icons/rejected-icon.png';
import ErrorIcon from '@/assets/icons/error-icon.png';
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
          Você já pode realizar transações e participar dos desafios do
          Cartola Express!
        </LabelDescriptionCentered>
      </ContentBox>
    </>
  );

  const renderInProcess = (
    <>
      <LabelCenter>
        <img src={InProcessIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitleCentered>
          Enviado! Aguarde a verificação das suas informações.
        </LabelTitleCentered>
        <LabelDescBoxCentered>
          Agora que você enviou as fotos, Vamos verificar suas informações.
          Fique de olho no seu e-mail, em algumas horas te enviaremos um retorno
        </LabelDescBoxCentered>
        <LabelDescriptionCentered>
          Vamos enviar um e-mail para <strong>email@email.com</strong> assim
          que tivermos novas informações.
        </LabelDescriptionCentered>
      </ContentBox>
    </>
  );

  const renderRejected = (
    <>
      <LabelCenter>
        <img src={RejectedIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitleCentered>
          Opa, precisamos que você envie fotos do seu documento novamente.
        </LabelTitleCentered>
        <LabelDescriptionCentered>
          A foto do documento enviado está ilegível.
          Precisamos que você faça o envio novamente.
        </LabelDescriptionCentered>
      </ContentBox>
    </>
  );

  const renderSuspected = (
    <>
      <LabelCenter>
        <img src={SuspectedIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitleCentered>
          Poxa, você não pode entrar em campo...
        </LabelTitleCentered>
        <LabelDescriptionCentered>
          Identificamos pendências em seu nome, e para
          jogar Cartola Express é preciso regularizar
          sua situação.
        </LabelDescriptionCentered>
      </ContentBox>
    </>
  );

  const renderError = (
    <>
      <LabelCenter>
        <img src={ErrorIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitleCentered>
          Ops! Isso não deveria ter acontecido.
        </LabelTitleCentered>
        <LabelDescriptionCentered>
          Por favor, tente novamente. Se o problema persistir,
          entre em contato com o nosso antendimento.
        </LabelDescriptionCentered>
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
