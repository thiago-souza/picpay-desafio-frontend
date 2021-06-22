import * as React from 'react';
import { CustomButton } from '@/components/button';
import { CustomLink } from '@/components/link';
import { DocumentBox } from '@/components/document';
import {
  LabelDescription,
  LabelSubtitle,
  LabelTitle,
} from '@/components/label';
import { ContentBox } from '@/components/content/content.style';
import {
  ContentItems,
  ContentSideBar,
} from '@/components/content/content.style';
import RgCpfIcon from '@/assets/icons/rg-cpf-icon.png';
import RgIcon from '@/assets/icons/rg-icon.png';
import SecurityIcon from '@/assets/icons/security-icon.png';
import { AuthContext } from '@/components/auth-context';
import ApiService from '@/services/api/api-service';

interface IOnboardingPage {
  goToPageCallback: (n: number) => void;
}

export const OnboardingPage: React.FC<IOnboardingPage> = (
  props: IOnboardingPage,
) => {
  const { goToPageCallback } = props;
  const values = React.useContext(AuthContext);
  console.log('globoId: ', values.globoId);
  console.log('email: ', values.email);

  //TODO: Modificar a função para o link correto, assim que o mesmo for definido.
  const linkCallback = () => {
    alert('To be defined');
  };

  React.useEffect(() => {
    const status = async () => {
      if (values.globoId != null && values.globoId != '') {
        const apiService = new ApiService('', values.globoId);

        const sts = await apiService.getStatus();
        console.log(sts);
      }
    };
    status();
  }, [values]);

  return (
    <ContentItems>
      <LabelTitle>Verifique sua identidade</LabelTitle>
      <LabelDescription>
        Para continuar, precisamos que você faça a verificação da sua
        identidade. Isso garante a segurança das suas transações financeiras no
        Cartola Express. Veja o que você precisa enviar:
      </LabelDescription>
      <ContentBox>
        <LabelSubtitle>Foto do documento original</LabelSubtitle>
        <DocumentBox icon={RgIcon}>
          Foto da frente e do verso do seu documento de identificação original.
        </DocumentBox>
        <DocumentBox icon={RgCpfIcon}>
          Pode ser foto da sua CNH, RG, CPF ou RNE.
        </DocumentBox>
      </ContentBox>
      <ContentSideBar>
        <DocumentBox icon={SecurityIcon}>
          Relaxa, seus dados estão seguros com a gente.
        </DocumentBox>
        <CustomButton callbackEvent={() => goToPageCallback(1)}>
          Verificar identidade agora
        </CustomButton>
        <CustomLink callbackEvent={linkCallback}>Deixar pra depois</CustomLink>
      </ContentSideBar>
    </ContentItems>
  );
};
