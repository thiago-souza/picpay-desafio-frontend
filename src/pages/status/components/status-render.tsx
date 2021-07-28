import React from 'react';

import { ButtonLink, CustomButton } from '@/components/button';
import { LabelCenter } from '@/components/label';
import { ContentBox, ContentSideBar } from '@/pages/main/styles/content.style';
import { CustomLink } from '@/components/link';

import {
  LabelTitleCentered,
  LabelDescriptionCentered,
  LabelDescBoxCentered,
  LabelBold,
  LabelBoldCenter,
} from './status-render.style';

import InProcessIcon from '@/assets/icons/inprocess-icon.png';
import ApprovedIcon from '@/assets/icons/approved-icon.png';
import SuspectedIcon from '@/assets/icons/suspected-icon.png';
import RejectedIcon from '@/assets/icons/rejected-icon.png';
import ErrorIcon from '@/assets/icons/error-icon.png';

const urlExpressDF = process.env.EXPRESS_DF;
const urlCallCenter = process.env.EXPRESS_CALL_CENTER;
const urlHelpCenter = process.env.EXPRESS_HELP;

const goToCallCenter = () => {
  //@ts-ignore
  window.open(urlCallCenter, '_blank');
};

const goToHelpCenter = () => {
  //@ts-ignore
  window.open(urlHelpCenter, '_blank');
};

const goToSelectDocument = () => {
  //@ts-ignore
  window.location = '/select';
};

const buttonTryAgain = (
  <ContentSideBar>
    <CustomButton callbackEvent={() => history.back()}>
      Tentar Novamente
    </CustomButton>
  </ContentSideBar>
);

export const renderApproved = (
  <>
    <LabelCenter>
      <img src={ApprovedIcon} />
    </LabelCenter>
    <ContentBox>
      <LabelTitleCentered>
        Pronto! Tudo certo com suas informações
      </LabelTitleCentered>
      <LabelDescBoxCentered>
        Você já pode realizar transações e participar dos desafios do Cartola
        Express!
      </LabelDescBoxCentered>
    </ContentBox>
    <ContentSideBar>
      <ButtonLink goToUrl={urlExpressDF}>Continuar</ButtonLink>
    </ContentSideBar>
  </>
);

export const renderInProcess = (email: string): JSX.Element => (
  <>
    <LabelCenter>
      <img src={InProcessIcon} />
    </LabelCenter>
    <ContentBox>
      <LabelTitleCentered>
        Enviado! Aguarde a verificação das suas informações.
      </LabelTitleCentered>
      <LabelDescBoxCentered>
        Agora que você enviou as fotos, Vamos verificar suas informações. Fique
        de olho no seu e-mail, em algumas horas te enviaremos um retorno
      </LabelDescBoxCentered>
      <LabelDescriptionCentered>
        Vamos enviar um e-mail para <LabelBold>{email}</LabelBold> assim que
        tivermos novas informações.
      </LabelDescriptionCentered>
    </ContentBox>
    <ContentSideBar>
      <ButtonLink goToUrl={urlExpressDF}>Voltar para o início</ButtonLink>
    </ContentSideBar>
  </>
);

export const renderStillInProcess = (email: string): JSX.Element => (
  <>
    <LabelCenter>
      <img src={InProcessIcon} />
    </LabelCenter>
    <ContentBox>
      <LabelTitleCentered>
        Opa, ainda estamos verificando suas informações.
      </LabelTitleCentered>
      <LabelDescBoxCentered>
        Aguarde um pouco mais! Em breve você poderá conferir se deu tudo certo.
      </LabelDescBoxCentered>
      <LabelDescriptionCentered>
        Vamos enviar um e-mail para <LabelBold>{email}</LabelBold> assim que
        tivermos novas informações.
      </LabelDescriptionCentered>
    </ContentBox>
    <ContentSideBar>
      <ButtonLink goToUrl={urlExpressDF}>Voltar para o início</ButtonLink>
    </ContentSideBar>
  </>
);

const GoToLobby = () => {
  //@ts-ignore
  window.location = urlExpressDF;
};

export const renderRejected = (callbackSeeLater: () => void): JSX.Element => {
  return (
    <>
      <LabelCenter>
        <img src={RejectedIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitleCentered>
          Opa, precisamos que você envie fotos do seu documento novamente.
        </LabelTitleCentered>
        <LabelDescriptionCentered>
          Não foi possível validar a foto do documento.
          Precisamos que você faça o envio novamente.
        </LabelDescriptionCentered>
      </ContentBox>
      <ContentSideBar>
        <CustomButton callbackEvent={() => goToSelectDocument()}>
          Reniciar o processo
        </CustomButton>
      </ContentSideBar>
      <CustomLink callbackEvent={callbackSeeLater}>
        Deixar pra depois
      </CustomLink>
    </>
  );
};

export const renderSuspected = (
  <>
    <LabelCenter>
      <img src={SuspectedIcon} />
    </LabelCenter>
    <ContentBox>
      <LabelTitleCentered>
        Poxa, você não pode entrar em campo...
      </LabelTitleCentered>
      <LabelDescBoxCentered>
        Identificamos pendências em seu nome, e para jogar Cartola Express é
        preciso regularizar sua situação.
      </LabelDescBoxCentered>
    </ContentBox>
    <ContentSideBar>
      <CustomButton callbackEvent={() => GoToLobby()}>
        Voltar para o início
      </CustomButton>
    </ContentSideBar>
    <CustomLink callbackEvent={() => goToHelpCenter()}>
      Acessar a ajuda
    </CustomLink>
  </>
);

export const renderIsPending = (
  <>
    <LabelCenter>
      <img src={ErrorIcon} />
    </LabelCenter>
    <LabelCenter>CÓD. 203</LabelCenter>
    <ContentBox>
      <LabelTitleCentered>
        Ops! Isso não deveria ter acontecido.
      </LabelTitleCentered>
      <LabelDescBoxCentered>
        Por favor, entre em contato com o nosso antendimento.
      </LabelDescBoxCentered>
      <CustomLink tiny callbackEvent={goToCallCenter}>
        Atendimento Online
      </CustomLink>
    </ContentBox>
    {buttonTryAgain}
    <CustomLink callbackEvent={GoToLobby}>Voltar para o início</CustomLink>
  </>
);

export const renderError = (
  <>
    <LabelCenter>
      <img src={ErrorIcon} />
    </LabelCenter>
    <LabelBoldCenter>CÓD. 100-A</LabelBoldCenter>
    <ContentBox>
      <LabelTitleCentered>
        Ops! Isso não deveria ter acontecido.
      </LabelTitleCentered>
      <LabelDescBoxCentered>
        Por favor, tente novamente. Se o problema persistir, entre em contato
        com o nosso antendimento.
      </LabelDescBoxCentered>
      <CustomLink tiny callbackEvent={goToCallCenter}>
        Atendimento Online
      </CustomLink>
    </ContentBox>
    {buttonTryAgain}
    <CustomLink callbackEvent={GoToLobby}>Voltar para o início</CustomLink>
  </>
);
