import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton } from '@/components/button';
import { CustomLink } from '@/components/link';
import { DocumentBox } from '@/components/document';
import {
  LabelDescription,
  LabelSubtitle,
  LabelTitle,
} from '@/components/label';
import { LoadingComponent } from '../../components/loading';
import {
  ContentBox,
  ContentItems,
  ContentSideBar,
} from '@/pages/main/styles/content.style';
import CnhRgIcon from '@/assets/icons/cnh-rg-icon.png';
import RgIcon from '@/assets/icons/rg-icon.png';
import SecurityIcon from '@/assets/icons/security-icon.png';
import { AuthContext } from '@/components/auth-context';
import getApi, { ApiService } from '@/services/api/api-service';
import { ModalConfirm } from '../../components/modal-confirm';
import { sendEvent } from '@/services/tracking';
import { checkAuthIsInvalid, getPageFromStatus } from '@/services/onboarding';

export const OnboardingPage: React.FC = () => {
  const history = useHistory();
  const authData = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalShown, setIsModalShown] = React.useState(false);

  const redirectUserOffWhitelist = async (apiService: ApiService) => {
    await apiService.IsGloboIdInExpressWhiteList().then(res => {
      if (!res.isMember) {
        window.location.href = process.env.CARTOLA_URL || '';
        return;
      }
    }).catch(() => {
      history.push('/status/error');
      return;
    });
  }

  const redirectUserByStatus = (apiService: ApiService) => {
    apiService.getStatus().then(status => {  
      const newUrl = getPageFromStatus(status.statusCode, status.data?.status);
      history.push(newUrl);
    }).catch(() => {
      history.push('/status/error');
    });
  }

  React.useEffect(() => {
    (async () => {
      setIsLoading(false);
    
      if (checkAuthIsInvalid(authData)) {
        return;
      }

      const apiService = getApi(authData.token, authData.globoId);
      setIsLoading(true);
      
      
      await redirectUserOffWhitelist(apiService),
      await redirectUserByStatus(apiService)
      
      setIsLoading(false);
    })()
  }, [authData]);

  const handleClickVerifyIdentity = () => {
    sendEvent(
      'know-your-costumer',
      'verificar-identidade',
      'verificar-agora',
    );
    history.push('select');
  };

  const handleClickSeeLater = (fromModal = false) => {
    sendEvent(
      'know-your-costumer',
      'verificar-identidade',
      fromModal ? 'verificar-agora-retificado' : 'deixar-pra-depois',
    );
    setIsModalShown(!isModalShown);
  };

  return (
    <>
      <LoadingComponent isShow={isLoading} />
      <ModalConfirm isShown={isModalShown} callbackHide={() => handleClickSeeLater(true)} />
      <ContentItems>
        <LabelTitle>Verifique sua identidade</LabelTitle>
        <LabelDescription data-testid="header-description">
          Para continuar, precisamos que você faça a verificação da sua
          identidade. Isso garante a segurança das suas transações financeiras
          no Cartola Express. Veja o que você precisa enviar:
        </LabelDescription>
        <ContentBox>
          <LabelSubtitle>Foto do documento original</LabelSubtitle>
          <DocumentBox icon={RgIcon}>
            Foto da frente e do verso do seu documento de identificação
            original.
          </DocumentBox>
          <DocumentBox icon={CnhRgIcon}>
            Pode ser foto da sua CNH ou RG.
          </DocumentBox>
        </ContentBox>
        <ContentSideBar data-testid="content-side-bar">
          <DocumentBox icon={SecurityIcon} light={true}>
            Relaxa, seus dados estão seguros com a gente.
          </DocumentBox>
          <CustomButton callbackEvent={handleClickVerifyIdentity}>
            Verificar identidade agora
          </CustomButton>
          <CustomLink callbackEvent={handleClickSeeLater}>
            Deixar pra depois
          </CustomLink>
        </ContentSideBar>
      </ContentItems>
    </>
  );
};
