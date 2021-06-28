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
    //   if (values.token == null || values.globoId == null) {
    //     console.log('token ou globoid não informados');
    //     return;
    //   }
    //   const apiService = getApi(values.token, values.globoId);
    //   //console.log('base64 front: ', base64Front);
    //   //console.log('base64 back: ', base64Back);
    //   // ENVIAR FRONT E BACK
    //   const uploadRes = await apiService.upload(base64Front, selectedDoc);
    //   handleUploadResponse(uploadRes);
  };

  // const handleUploadResponse = async (status: number) => {
  //   const apiService = getApi(values.token, values.globoId);

  //   switch (status) {
  //     case 201:
  //       console.log('201 - CREATED - Upload realizado com sucesso');
  //       const verifyRes1 = await apiService.verify();
  //       handleVerifyResponse(verifyRes1);
  //       break;
  //     case 202:
  //       console.log(
  //         '202 - ACCEPTED - Upload realizado com sucesso mas ja existia upload antigo ou rejeitado',
  //       );
  //       const verifyRes2 = await apiService.verify();
  //       handleVerifyResponse(verifyRes2);
  //       break;
  //     case 412:
  //       console.log('412 - PRECONDITION FAILED - Processo já reprovado');
  //       history.push(`/status/SUSPECTED`); //passar status junto
  //       break;
  //     case 417:
  //       console.log('417 - EXPECTATION FAILED - Processo já aprovado');
  //       history.push(`/status/APPROVED`); //passar status junto
  //       break;
  //     case 423:
  //       console.log('423 - LOCKED - Processo em andamento');
  //       history.push(`/status/IN_PROCESS`); //passar status junto
  //       break;
  //     default:
  //       console.log('UNKNOW ERROR');
  //   }
  // };

  // const handleVerifyResponse = (status: number) => {
  //   switch (status) {
  //     case 200:
  //       console.log('200 - APPROVED - Processo já aprovado');
  //       break;
  //     case 201:
  //       console.log('201 - CREATED - Processo já em andamento');
  //       break;
  //     case 202:
  //       console.log(
  //         '202 - ACCEPTED - Status IN_PROCESS e processo IdWall iniciado',
  //       );
  //       break;
  //     case 409:
  //       console.log('409 - CONFLICTED - Usuário não existe no mysql');
  //       break;
  //     case 412:
  //       console.log('412 - PRECONDITION FAILED - Processo já reprovado');
  //       break;
  //     case 417:
  //       console.log('417 - EXPECTATION FAILED - Anexos ainda não enviados');
  //       break;
  //     default:
  //       console.log('UNKNOW ERROR');
  //   }
  // };

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
