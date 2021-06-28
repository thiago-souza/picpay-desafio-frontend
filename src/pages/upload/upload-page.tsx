import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UploadBoxStyle } from './upload.style';
import { CustomButton, UploadButton } from '@/components/button';
import {
  LabelDescriptionButton,
  LabelDescription,
  LabelSubtitleButton,
  LabelSubtitle,
} from '@/components/label';
import { ContentSideBar } from '@/pages/main/styles/content.style';
import UploadIcon from '@/assets/icons/cloud-upload-icon.png';
import { AuthContext } from '@/components/auth-context';
import getApi from '@/services/api/api-service';
import { FileData } from '@/services/files';
import getRedirectUrl from '@/services/navigation';

interface IUploadBox {
  selectedDoc: string;
}

export const UploadBox = ({ selectedDoc }: IUploadBox): JSX.Element => {
  console.log('🚀 selectedDoc', selectedDoc);
  const history = useHistory();
  const [frontFileData, setFrontFileData] = React.useState<FileData | null>(null);
  const [backFileData, setBackFileData] = React.useState<FileData | null>(null);
  const authData = React.useContext(AuthContext);

  const handleDeleteFront = () => setFrontFileData(null);
  const handleDeleteBack = () => setBackFileData(null);

  const handleFileExtensionError = (fileData: FileData | null) => {
    if (fileData?.validExtension) return fileData.name;

    return 'Ops! A foto enviada é diferente do formato ou tamanho aceito. Envie uma nova foto.';
  };

  const handleFileExtensionClass = (extensionValid?: boolean) => {
    return extensionValid ? '' : 'error';
  };

  const uploadLabels = (tipoArquivo: string) => {
    const fileData = tipoArquivo === 'Frente' ? frontFileData : backFileData;
    return (
      <>
        <LabelSubtitleButton className={` ${fileData !== null ? 'tiny' : ''}`}>
          {fileData === null && <img src={UploadIcon} />}
          {fileData?.validExtension && `${tipoArquivo} do documento`}
        </LabelSubtitleButton>
        <LabelDescriptionButton
          className={`${handleFileExtensionClass(fileData?.validExtension)}`}
        >
          {fileData === null
            ? 'Clique para enviar ou arraste a foto aqui.'
            : handleFileExtensionError(fileData)}
        </LabelDescriptionButton>
      </>
    );
  };

  const uploadFiles = async () => {
    if (authData.token == null || authData.globoId == null) {
      console.log('token ou globoid não informados');
      return;
    }
    const apiService = getApi(authData.token, authData.globoId);
    console.log('base64 front: ', frontFileData?.base64);
    // ENVIAR FRONT E BACK
    if (frontFileData) {
      const uploadRes = await apiService.upload(frontFileData.base64, selectedDoc);
      handleUploadResponse(uploadRes);
    }
  };

  const handleUploadResponse = async (status: number) => {
    const apiService = getApi(authData.token, authData.globoId);

    const url = getRedirectUrl('accounts/attachments', status);

    if (url === 'verify') {
      const verifyRes1 = await apiService.verify();
      handleVerifyResponse(verifyRes1);
    } else {
      history.push(url);
    }
  };

  const handleVerifyResponse = (status: number) => {
    const url = getRedirectUrl('accounts/verify', status);

    history.push(url);
  };

  const isDisabled = frontFileData === null && backFileData === null;

  return (
    <>
      <ContentSideBar>
        <UploadBoxStyle>
          <LabelSubtitle>Upload do documento</LabelSubtitle>
          <LabelDescription>
            Formatos: JPG, PNG ou BMP | O tamanho deve ser até 3 MB.
          </LabelDescription>

          <UploadButton
            id={'front'}
            fileData={frontFileData}
            onFileSelected={setFrontFileData}
            callbackDeleteFile={handleDeleteFront}
          >
            {uploadLabels('Frente')}
          </UploadButton>

          <UploadButton
            id={'back'}
            fileData={backFileData}
            onFileSelected={setBackFileData}
            callbackDeleteFile={handleDeleteBack}
          >
            {uploadLabels('Verso')}
          </UploadButton>
        </UploadBoxStyle>
        <CustomButton disabled={isDisabled} callbackEvent={uploadFiles}>
          Enviar documento
        </CustomButton>
      </ContentSideBar>
    </>
  );
};
