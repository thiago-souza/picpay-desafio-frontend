import * as React from 'react';
import { ButtonLink } from '@/components/button';
import { LabelCenter } from '@/components/label';
import { DocumentCardBox } from '@/components/document';
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
import CNHRejectedIcon from '@/assets/icons/cnh-rejected.png';
import RGRejectedIcon from '@/assets/icons/rg-rejected.png';
import { useParams } from 'react-router-dom';
import {
  LabelTitleCentered,
  LabelDescriptionCentered,
  LabelDescBoxCentered,
  LabelBold,
} from './status.style';
import { AuthContext } from '@/components/auth-context';
import getApi from '@/services/api/api-service';

export const StatusPage: React.FC = () => {
  const authData = React.useContext(AuthContext);
  const [docType, setDocType] = React.useState('');
  const { type } = useParams<{ type: string }>();

<<<<<<< HEAD
  const handleCallBack = () => {
    alert('Em construção');
  };

  const renderActive = (
    <>
      <ContentBox>
        <LabelTitleCentered>Opa! Precisamos de novas fotos</LabelTitleCentered>
        <LabelDescriptionCentered>
          A foto do documento enviado está ilegível. Precisamos que você faça o
          envio novamente.
        </LabelDescriptionCentered>
        <DocumentCardBox icon={docType == "CNH" ? CNHRejectedIcon : RGRejectedIcon}>
          {docType}: Problema nas fotos
        </DocumentCardBox>
      </ContentBox>
    </>
  );

=======
>>>>>>> ajustes-de-layout
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
          Você já pode realizar transações e participar dos desafios do Cartola
          Express!
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
          Vamos enviar um e-mail para <LabelBold>{authData.email}</LabelBold>{' '}
          assim que tivermos novas informações.
<<<<<<< HEAD
        </LabelDescriptionCentered>
      </ContentBox>
    </>
  );

  const renderStillInProcess = (
    <>
      <LabelCenter>
        <img src={InProcessIcon} />
      </LabelCenter>
      <ContentBox>
        <LabelTitleCentered>
          Opa, ainda estamos verificando suas informações.
        </LabelTitleCentered>
        <LabelDescBoxCentered>
          Aguarde um pouco mais! Em breve você poderá conferir se deu tudo
          certo.
        </LabelDescBoxCentered>
        <LabelDescriptionCentered>
          Vamos enviar um e-mail para <LabelBold>{authData.email}</LabelBold>{' '}
          assim que tivermos novas informações.
=======
>>>>>>> ajustes-de-layout
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
          A foto do documento enviado está ilegível. Precisamos que você faça o
          envio novamente.
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
          Identificamos pendências em seu nome, e para jogar Cartola Express é
          preciso regularizar sua situação.
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
          Por favor, tente novamente. Se o problema persistir, entre em contato
          com o nosso antendimento.
        </LabelDescriptionCentered>
      </ContentBox>
    </>
  );

  const getAttachments = async () => {
    const apiService = getApi(authData.token, authData.globoId);
    const attachmentsResponse = await apiService.getAttachments();
    setDocType(attachmentsResponse.data[0].type.toUpperCase());
  };

  const renderTypeStatus = () => {
    switch (type.toLowerCase()) {
      case 'in_process':
        return renderInProcess;
      case 'still_in_process':
        return renderStillInProcess;
      case 'active': {
        getAttachments();
        return renderActive;
      }
      case 'approved':
        return renderApproved;
      case 'suspected':
        return renderSuspected;
      case 'rejected':
        return renderRejected;
      case 'error':
        return renderError;
      default:
        return renderError;
    }
  };

  const urlExpressDF = process.env.EXPRESS_DF;

  return (
    <ContentItems>
      {renderTypeStatus()}
      <ContentSideBar>
        <ButtonLink goToUrl={urlExpressDF}>VOLTAR AO LOBBY</ButtonLink>
      </ContentSideBar>
    </ContentItems>
  );
};
