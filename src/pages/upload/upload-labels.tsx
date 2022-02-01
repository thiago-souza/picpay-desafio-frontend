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
}

export const UploadLabels = ({
  fileType,
  fileData,
  selectedDoc,
}: IUploadLabels): JSX.Element => {
  const sendEventWithLabel = (label: string) => {
    if (!label) {
      return;
    }
    sendEvent('know-your-customer', 'enviar-documento', label);
  };

  const handleFileExtensionAndSizeError = (
    fileData: FileData,
    fileType: string,
  ) => {
    if (fileData && checkIsFileValid(fileData)) return fileData?.name;

    const errorLabel = fileType === 'Frente' ? 'frente' : 'verso';

    const { name, size, validSize, validExtension } = fileData;

    sendEventWithLabel(
      `erro-${errorLabel}-${selectedDoc}-${handleGTMTypeError(name, size, validSize, validExtension)}`,
    );

    return 'Ops! A foto enviada é diferente do formato \n ou tamanho aceito. Envie uma nova foto.';
  };

  const handleFileDataLabel = (
    fileData: FileData | undefined,
    fileType: string,
  ) => {
    if (fileData === undefined) {
      return 'Clique para enviar ou arraste a foto aqui.';
    }
    return handleFileExtensionAndSizeError(fileData, fileType);
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
        className={`${fileExtensionAndSizeIsValid(fileData)}`}
      >
        {handleFileDataLabel(fileData, fileType)}
      </LabelDescriptionButton>
    </>
  );
};
