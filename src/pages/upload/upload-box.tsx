import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UploadBoxStyle } from './upload.style';
import { CustomButton, UploadButton } from '@/components/button';
import {
  LabelDescriptionSubTitle,
  LabelSubTitleSmall,
} from '@/components/label';
import { NavigationBack } from '@/components/navigation/navigation-back';
import { ContentSideBar } from '@/pages/main/styles/content.style';
import { LoadingComponent } from '@/components/loading';
import { AuthContext } from '@/components/auth-context';
import { FileData, isValidFiles } from '@/services/files';
import getRedirectUrl from '@/services/navigation';
import getApi from '@/services/api/api-service';
import { sendEvent } from '@/services/tracking';
import { checkAuthIsInvalid } from '@/services/onboarding';
import { UploadLabels } from '@/pages/upload';

interface IUploadBox {
  selectedDoc: string;
}

export const UploadBox = ({ selectedDoc }: IUploadBox): JSX.Element => {
  const history = useHistory();
  const [frontFileData, setFrontFileData] = React.useState<FileData>();
  const [backFileData, setBackFileData] = React.useState<FileData>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [mimeTypeAcceptedFront, setMimeTypeAcceptedFront] =
    React.useState<boolean>(false);
  const [mimeTypeAcceptedBack, setMimeTypeAcceptedBack] =
    React.useState<boolean>(false);
  const authData = React.useContext(AuthContext);

  const modalState = {
    front: false,
    back: false,
  };
  const [mState, setMState] = React.useState(modalState);

  const sendEventWithLabel = (label: string) => {
    if (!label) {
      return;
    }
    sendEvent('know-your-customer', 'enviar-documento', label);
  };

  const handleDeleteFront = () => {
    sendEventWithLabel('remover-frente');
    setFrontFileData(undefined);
  };

  const handleDeleteBack = () => {
    sendEventWithLabel('remover-verso');
    setBackFileData(undefined);
  };

  const handleLoadFrontFile = (file: FileData) => {
    setFrontFileData(file);
    sendEventWithLabel(`frente-${selectedDoc}-carregada`);
  };

  const handleLoadBackFile = (file: FileData) => {
    setBackFileData(file);
    sendEventWithLabel(`verso-${selectedDoc}-carregado`);
  };

  const uploadFiles = async () => {
    if (checkAuthIsInvalid(authData)) {
      return;
    }

    sendEventWithLabel('enviar');

    const apiService = getApi(authData.token, authData.globoId);

    if (frontFileData) {
      setIsLoading(true);
      const fileEx = frontFileData.name.split('.').pop();

      let uploadFrontRes = null;
      try {
        uploadFrontRes = await apiService.upload(
          `data:image/${fileEx};base64,${frontFileData.base64}`,
          `${selectedDoc}_FRONT`,
        );
      } catch (error) {
        console.log('Error: ', error);
        history.push('/status/error');
        return;
      }

      if (
        (uploadFrontRes.statusCode == 201 ||
          uploadFrontRes.statusCode == 202) &&
        backFileData
      ) {
        const fileEx = backFileData.name.split('.').pop();

        let uploadBackRes = null;
        try {
          uploadBackRes = await apiService.upload(
            `data:image/${fileEx};base64,${backFileData.base64}`,
            `${selectedDoc}_BACK`,
          );
        } catch (error) {
          console.log('Error: ', error);
          history.push('/status/error');
          return;
        }

        handleUploadResponse(uploadBackRes.statusCode);
        return;
      }

      handleUploadResponse(uploadFrontRes);
    }
  };

  const handleUploadResponse = async (status: number) => {
    const apiService = getApi(authData.token, authData.globoId);
    const url = getRedirectUrl('accounts/attachments', status);

    if (url === 'verify') {
      let verifyRes = null;
      try {
        verifyRes = await apiService.verify();
      } catch (error) {
        console.log('Error: ', error);
        history.push('/status/error');
        return;
      }

      handleVerifyResponse(verifyRes.statusCode);
      return;
    }

    setIsLoading(false);
    history.push(url);
  };

  const handleVerifyResponse = (status: number) => {
    const url = getRedirectUrl('accounts/verify', status);

    setIsLoading(false);
    history.push(url);
  };

  const handleModal = (type: string) => {
    if (type == 'front') {
      setMState({ ...mState, front: !mState.front });
      return;
    }
    setMState({ ...mState, back: !mState.back });
  };

  // const handleMimeValidate = (file: File) => {
  const handleMimeValidateFront = (validMime: boolean) => {
    setMimeTypeAcceptedFront(validMime);
  };

  const handleMimeValidateBack = (validMime: boolean) => {
    setMimeTypeAcceptedBack(validMime);
  };

  const handleNavigationBack = () => {
    sendEventWithLabel('voltar-envio-documento');
  };

  const subtitleLabel =
    selectedDoc === 'CNH'
      ? 'Carteira de Motorista (CNH)'
      : 'Cédula de Identidade (RG)';

  return (
    <>
      <LoadingComponent isShow={isLoading} />
      <ContentSideBar data-testid="upload-content">
        <NavigationBack onClickEvent={handleNavigationBack} />
        <UploadBoxStyle>
          <LabelSubTitleSmall>Upload da sua {subtitleLabel}</LabelSubTitleSmall>
          <LabelDescriptionSubTitle>
            Formatos: <b>JPG</b> ou <b>PNG</b> | Tamanho do arquivo:{' '}
            <b>min. 200KB</b> e <b>max. 9MB.</b>
          </LabelDescriptionSubTitle>

          <UploadButton
            id={'front'}
            fileData={frontFileData}
            onFileSelected={handleLoadFrontFile}
            callbackDeleteFile={handleDeleteFront}
            callbackImgPreview={() => handleModal('front')}
            onClickEvent={() => sendEventWithLabel('frente')}
            isShownModal={mState.front}
            typeFile="Frente do documento"
            callbackMimeType={handleMimeValidateFront}
          >
            <UploadLabels
              fileType={'Frente'}
              fileData={frontFileData}
              selectedDoc={selectedDoc}
              mimeType={mimeTypeAcceptedFront}
            />
          </UploadButton>

          <UploadButton
            id={'back'}
            fileData={backFileData}
            onFileSelected={handleLoadBackFile}
            callbackDeleteFile={handleDeleteBack}
            callbackImgPreview={() => handleModal('back')}
            onClickEvent={() => sendEventWithLabel('verso')}
            isShownModal={mState.back}
            typeFile="Verso do documento"
            callbackMimeType={handleMimeValidateBack}
          >
            <UploadLabels
              fileType={'Verso'}
              fileData={backFileData}
              selectedDoc={selectedDoc}
              mimeType={mimeTypeAcceptedBack}
            />
          </UploadButton>
        </UploadBoxStyle>
        <CustomButton
          disabled={!isValidFiles(frontFileData, backFileData, mimeTypeAcceptedFront, mimeTypeAcceptedBack)}
          callbackEvent={uploadFiles}
        >
          Enviar documento
        </CustomButton>
      </ContentSideBar>
    </>
  );
};
