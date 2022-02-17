import * as React from 'react';
import {
  LabelDescriptionButton,
  LabelSubtitleButton,
} from '@/components/label';
import UploadIcon from '@/assets/icons/cloud-upload-icon.png';
import {
  checkIsFileValid,
  FileData,
  fileExtensionAndSizeIsValid,
  handleGTMTypeError,
} from '@/services/files';
import { sendEvent } from '@/services/tracking';

interface IUploadLabels {
  fileType: string;
  fileData?: FileData;
  selectedDoc: string;
  mimeType: boolean;
}

export const UploadLabels = ({
  fileType,
  fileData,
  selectedDoc,
  mimeType,
}: IUploadLabels): JSX.Element => {
  const msgErrorInvalidExtension =
    'Ops! Este formato de arquivo não é aceito. Envie \n outro em JPG ou PNG para seguir.';
  const msgErrorInvalidSizeSmall =
    'Ops! O arquivo enviado é menor que 200kb. Envie \n um arquivo maior para seguir.';
  const msgErrorInvalidSizeLarge =
    'Ops! O arquivo enviado é maior que 9MB. Envie \n um arquivo menor para seguir.';
  const msgChangeExtensionInvalid =
    'Ops! Identificamos que a extensão do arquivo foi alterada. \n Envie um JPG ou PNG original para seguir.';

  const sendEventWithLabel = (label: string) => {
    if (!label) {
      return;
    }
    sendEvent('know-your-customer', 'enviar-documento', label);
  };

  const handleMsgError = (
    validSize: boolean,
    validExtension: boolean,
    size: number,
    mimeType: boolean,
  ) => {
    if (!validExtension) {
      return msgErrorInvalidExtension;
    }
    if (!validSize && size < 200000) {
      return msgErrorInvalidSizeSmall;
    }
    if(!mimeType){
      return msgChangeExtensionInvalid;
    }
    return msgErrorInvalidSizeLarge;
  };

  const handleFileExtensionAndSizeError = (
    fileData: FileData,
    fileType: string,
    mimeType: boolean,
  ) => {
   
    if (fileData && checkIsFileValid(fileData) && mimeType) return fileData?.name;

    const errorLabel = fileType === 'Frente' ? 'frente' : 'verso';

    const { name, size, validSize, validExtension } = fileData;
    
    sendEventWithLabel(
      `erro-${errorLabel}-${selectedDoc}-${handleGTMTypeError(
        name,
        size,
        validSize,
        validExtension,
      )}`,
    );
    return handleMsgError(validSize, validExtension, size, mimeType);
  };

  const handleFileDataLabel = (
    fileData: FileData | undefined,
    fileType: string,
    mimeType: boolean,
  ) => {
    if (fileData === undefined) {
      return 'Clique para enviar ou arraste a foto aqui.';
    }
    return handleFileExtensionAndSizeError(fileData, fileType, mimeType);
  };

  const uploadLabel = selectedDoc === 'CNH' ? 'da CNH' : 'do RG';

  return (
    <>
      <LabelSubtitleButton
        className={` ${fileData !== undefined ? 'tiny' : ''}`}
      >
        {fileData === undefined && <img src={UploadIcon} />}
        {`${fileType} ${uploadLabel}`}
      </LabelSubtitleButton>
      <LabelDescriptionButton
        data-testid={`uploaded-label-${fileType.toLowerCase()}`}
        className={`${fileExtensionAndSizeIsValid(fileData, mimeType)}`}
      >
        {handleFileDataLabel(fileData, fileType, mimeType)}
      </LabelDescriptionButton>
    </>
  );
};
