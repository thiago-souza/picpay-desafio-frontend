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

interface IUploadBox {
  selectedDoc: string;
}

export const UploadBox = ({ selectedDoc }: IUploadBox): JSX.Element => {
  console.log('🚀 selectedDoc', selectedDoc);
  const history = useHistory();
  const [base64Front, setBase64Front] = React.useState('');
  const [base64Back, setBase64Back] = React.useState('');
  const [frontInfo, setFrontInfo] = React.useState([]);
  const [backInfo, setBackInfo] = React.useState([]);
  const [contentValuesFront, setContentValuesFront] = React.useState({});
  const [contentValuesBack, setContentValuesBack] = React.useState({});
  const [isDisabled, setIsDisabled] = React.useState(true);
  const values = React.useContext(AuthContext);

  const docFrontId = 'docFrontId';
  const docBackId = 'docBackId';

  const handleFileBase64Doc = (base64File: string, fileId: string) => {
    if (fileId === docFrontId) {
      setBase64Front(base64File);
      return;
    }
    setBase64Back(base64File);
  };

  const handleFileParams = (fileParams: any, fileId: string) => {
    const isValid = isFileExtensionValid(fileParams.name);
    const contentValues = {
      content: isValid ? '✓' : 'x',
      color: isValid ? '#26ca5e' : '#c22d1e',
    };

    if (fileId === docFrontId) {
      setContentValuesFront(contentValues);
      setFrontInfo(fileParams.name);
      setIsDisabled(isValid ? false : true);
      return;
    }
    setContentValuesBack(contentValues);
    setIsDisabled(isValid ? false : true);
    setBackInfo(fileParams.name);
  };

  const handleDeleteFile = (fileId: string) => {
    if (fileId === docFrontId) {
      setIsDisabled(true);
      setBase64Front('');
      setFrontInfo([]);
      return;
    }
    setBase64Back('');
    setBackInfo([]);
  };

  const isFileExtensionValid = (fileName: string) => {
    if (fileName.length <= 0) return true;

    const allowedExtensions = ['jpg', 'jpeg', 'bmp', 'png'];
    const fileEx = fileName.split('.').pop();
    if (fileEx == undefined) return false;

    return allowedExtensions.includes(fileEx);
  };

  const handleFileExtensionError = (fileName: string) => {
    if (isFileExtensionValid(fileName)) return fileName;

    return 'Ops! A foto enviada é diferente do formato ou tamanho aceito. Envie uma nova foto.';
  };

  const handleFileExtensionClass = (fileName: string) => {
    return isFileExtensionValid(fileName) ? '' : 'error';
  };

  const uploadLabelsFrontDoc = (
    <>
      <LabelSubtitleButton className={` ${frontInfo.length ? 'tiny' : ''}`}>
        {frontInfo.length === 0 && <img src={UploadIcon} />}
        {isFileExtensionValid(frontInfo.toString()) && 'Frente do documento'}
      </LabelSubtitleButton>
      <LabelDescriptionButton
        className={`${handleFileExtensionClass(frontInfo.toString())}`}
      >
        {frontInfo.length === 0
          ? 'Clique para enviar ou arraste a foto aqui.'
          : handleFileExtensionError(frontInfo.toString())}
      </LabelDescriptionButton>
    </>
  );

  const uploadLabelsBackDoc = (
    <>
      <LabelSubtitleButton className={` ${frontInfo.length ? 'tiny' : ''}`}>
        {backInfo.length === 0 && <img src={UploadIcon} />}
        {isFileExtensionValid(backInfo.toString()) && 'Verso do documento'}
      </LabelSubtitleButton>
      <LabelDescriptionButton
        className={`${handleFileExtensionClass(backInfo.toString())}`}
      >
        {backInfo.length === 0
          ? 'Clique para enviar ou arraste a foto aqui.'
          : handleFileExtensionError(backInfo.toString())}
      </LabelDescriptionButton>
    </>
  );

  const uploadFiles = async () => {
    if (values.token == null || values.globoId == null) {
      console.log('token ou globoid não informados');
      return;
    }

    const apiService = getApi(values.token, values.globoId);
    //console.log('base64 front: ', base64Front);
    //console.log('base64 back: ', base64Back);

    // ENVIAR FRONT E BACK

    const uploadRes = await apiService.upload(base64Front, selectedDoc);
    handleUploadResponse(uploadRes);
  };

  const handleUploadResponse = async (status: number) => {
    const apiService = getApi(values.token, values.globoId);

    switch (status) {
      case 201:
        console.log('201 - CREATED - Upload realizado com sucesso');
        const verifyRes1 = await apiService.verify();
        handleVerifyResponse(verifyRes1);
        break;
      case 202:
        console.log(
          '202 - ACCEPTED - Upload realizado com sucesso mas ja existia upload antigo ou rejeitado',
        );
        const verifyRes2 = await apiService.verify();
        handleVerifyResponse(verifyRes2);
        break;
      case 412:
        console.log('412 - PRECONDITION FAILED - Processo já reprovado');
        history.push(`/status/SUSPECTED`); //passar status junto
        break;
      case 417:
        console.log('417 - EXPECTATION FAILED - Processo já aprovado');
        history.push(`/status/APPROVED`); //passar status junto
        break;
      case 423:
        console.log('423 - LOCKED - Processo em andamento');
        history.push(`/status/IN_PROCESS`); //passar status junto
        break;
      default:
        console.log('UNKNOW ERROR');
    }
  };

  const handleVerifyResponse = (status: number) => {
    switch (status) {
      case 200:
        console.log('200 - APPROVED - Processo já aprovado');
        break;
      case 201:
        console.log('201 - CREATED - Processo já em andamento');
        break;
      case 202:
        console.log(
          '202 - ACCEPTED - Status IN_PROCESS e processo IdWall iniciado',
        );
        break;
      case 409:
        console.log('409 - CONFLICTED - Usuário não existe no mysql');
        break;
      case 412:
        console.log('412 - PRECONDITION FAILED - Processo já reprovado');
        break;
      case 417:
        console.log('417 - EXPECTATION FAILED - Anexos ainda não enviados');
        break;
      default:
        console.log('UNKNOW ERROR');
    }
  };

  return (
    <>
      <ContentSideBar>
        <UploadBoxStyle>
          <LabelSubtitle>Upload do documento</LabelSubtitle>
          <LabelDescription>
            Formatos: JPG, PNG ou BMP | O tamanho deve ser até 3 MB.
          </LabelDescription>

          <UploadButton
            id={docFrontId}
            fileUploadedParams={handleFileParams}
            fileUploadedBase64={handleFileBase64Doc}
            callbackDeleteFile={handleDeleteFile}
            previewImg={base64Front}
            contentValues={contentValuesFront}
          >
            {uploadLabelsFrontDoc}
          </UploadButton>

          <UploadButton
            id={docBackId}
            fileUploadedParams={handleFileParams}
            callbackDeleteFile={handleDeleteFile}
            fileUploadedBase64={handleFileBase64Doc}
            previewImg={base64Back}
            contentValues={contentValuesBack}
          >
            {uploadLabelsBackDoc}
          </UploadButton>
        </UploadBoxStyle>
        <CustomButton disabled={isDisabled} callbackEvent={uploadFiles}>
          Enviar documento
        </CustomButton>
      </ContentSideBar>
    </>
  );
};
