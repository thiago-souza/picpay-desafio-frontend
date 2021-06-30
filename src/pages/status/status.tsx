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
        <LabelTitle>
          Tudo certo! Agora você pode usar o Cartola Express completo.
        </LabelTitle>
        <LabelDescription>
          Você jé pode fazer transações para participar dos desafios do game.
          Divirta-se!
        </LabelDescription>
      </ContentBox>
    </>
  );

  const renderInProcess = (
    <>
      <LabelTitle>
        Enviado! Aguarde a verificação das suas informações.
      </LabelTitle>
      <LabelDescription>
        Em breve, você vai poder realizar transações e participar das disputas
        do Cartola Express.
      </LabelDescription>
      <LabelDescription>
        Vamos enviar um e-mail para (email@email.com) assim que tivermos novas
        informações.
      </LabelDescription>
    </>
  );

  const renderSuspected = (
    <>
      <LabelTitle>Ops! Você não pode jogar Cartola Express.</LabelTitle>
      <LabelDescription>
        Os seus dados não foram aprovados pois existem pendências em seu nome.
      </LabelDescription>
    </>
  );

  const renderNotFound = (
    <>
      <LabelTitle>NOT FOUND!</LabelTitle>
      <LabelDescription>NOT FOUND!</LabelDescription>
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
      default:
        return renderNotFound;
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
