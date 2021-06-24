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
import { ContentSideBar } from '@/components/content/content.style';
import UploadIcon from '@/assets/icons/cloud-upload-icon.png';
import { AuthContext } from '@/components/auth-context';

interface IUploadBox {
  selectedDoc: string;
}

export const UploadBox = ({ selectedDoc }: IUploadBox): JSX.Element => {
  const history = useHistory();
  const [base64Front, setBase64Front] = React.useState('');
  const [base64Back, setBase64Back] = React.useState('');
  const [frontInfo, setFrontInfo] = React.useState([]);
  const [backInfo, setBackInfo] = React.useState([]);
  const [contentValuesFront, setContentValuesFront] = React.useState({});
  const [contentValuesBack, setContentValuesBack] = React.useState({});
  const [isDisabled, setIsDisabled] = React.useState(true);
  const token = React.useContext(AuthContext);
  console.log('UPLOAD - TOKEN: ', token);

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
        <CustomButton
          disabled={isDisabled}
          callbackEvent={() => history.push('status')}
        >
          Enviar documento
        </CustomButton>
      </ContentSideBar>
    </>
  );
};
