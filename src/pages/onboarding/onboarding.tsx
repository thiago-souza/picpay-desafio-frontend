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
import getApi from '@/services/api/api-service';
import getRedirectUrl from '@/services/navigation';

export const OnboardingPage: React.FC = () => {
  const history = useHistory();
  const authData = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);

  //TODO: Modificar a função para o link correto, assim que o mesmo for definido.
  const linkCallback = () => {
    alert('To be defined');
  };

  React.useEffect(() => {
    const status = async () => {
      setIsLoading(false);
      if (authData.token == null || authData.token == '') {
        console.log('token is empty');
        return;
      }

      if (authData.globoId == null || authData.globoId == '') {
        console.log('globoId is empty');
        return;
      }

      const apiService = getApi(authData.token, authData.globoId);
      setIsLoading(true);
      const statusResponse = await apiService.getStatus();
      console.log('status response: ', statusResponse);
      let url = getRedirectUrl('accounts/status', statusResponse.statusCode);
      if (url === 'status/') {
        if (statusResponse.data.status.toLowerCase() == 'in_process')
          url = `${url}still_${statusResponse.data.status.toLowerCase()}`;
        else if (statusResponse.data.status.toLowerCase() == 'created')
          url = 'upload';
        else
          url = `${url}${statusResponse.data.status.toLowerCase()}`;
        setIsLoading(false);
        history.push(url);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 950);
    };
    status();
  }, [authData]);

  return (
    <>
      <LoadingComponent isShow={isLoading}>
        Obtendo informações...
      </LoadingComponent>
      <ContentItems>
        <LabelTitle>Verifique sua identidade</LabelTitle>
        <LabelDescription>
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
        <ContentSideBar>
          <DocumentBox icon={SecurityIcon} light={true}>
            Relaxa, seus dados estão seguros com a gente.
          </DocumentBox>
          <CustomButton callbackEvent={() => history.push('select')}>
            Verificar identidade agora
          </CustomButton>
          <CustomLink callbackEvent={linkCallback}>
            Deixar pra depois
          </CustomLink>
        </ContentSideBar>
      </ContentItems>
    </>
  );
};
