import * as React from 'react';
import { CustomButton } from '@/components/button';
import { LabelDescription, LabelTitle, LabelCenter } from '@/components/label';
import {
  ContentBox,
  ContentItems,
  ContentSideBar,
} from '@/pages/main/styles/content.style';
import ApprovedIcon from '@/assets/icons/approved-icon.png';

interface IStatusPage {
  type?: string;
}

export const StatusPage: React.FC<IStatusPage> = (props: IStatusPage) => {
  const { type = 'approved' } = props;

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

  const renderWaiting = (
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

  const renderTypeStatus = () => {
    switch (type) {
      case 'approved':
        return renderApproved;
      case 'waiting':
        return renderWaiting;
      default:
        return renderApproved;
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
