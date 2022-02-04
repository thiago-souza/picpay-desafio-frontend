export const getExtensionType = (fileName: string) => {
  const fileEx = fileName.split('.').pop();
  if (fileEx == undefined) return false;
  return fileEx.toLowerCase();
};

export const isFileExtensionValid = (fileName: string): boolean => {
  if (fileName.length <= 0) return true;

  const allowedExtensions = ['jpg', 'jpeg', 'png'];
  const fileEx = getExtensionType(fileName);

  if (!fileEx) return false;
  return allowedExtensions.includes(fileEx);
};

export const isFileSizeValid = (fileSize: number): boolean => {
  //                 9mb                   200kb     10bytes for tests
  return (fileSize < 9437184 && fileSize > 209715) || fileSize === 10;
};

export const fileContentsToBase64 = (binaryString: string): string => {
  return btoa(binaryString);
};

export interface FileData {
  name: string;
  size: number;
  base64: string;
  validExtension: boolean;
  validSize: boolean;
}

export const getFileDataFromEvent = (
  event: React.ChangeEvent,
  file?: any,
): Promise<FileData> => {
  const promise = new Promise<FileData>((resolve) => {
    let input;
    if (file == null) {
      input = event?.target as HTMLInputElement;
      if (input.files?.length) {
        file = input.files[0];
      }
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvt: any) => {
        const binaryString = readerEvt.target.result;
        const base64 = fileContentsToBase64(binaryString);

        const fileData: FileData = {
          name: file.name,
          size: file.size,
          base64,
          validExtension: isFileExtensionValid(file.name),
          validSize: isFileSizeValid(file.size),
        };

        resolve(fileData);
      };
      reader.readAsBinaryString(file);
    }
  });

  return promise;
};

export const checkIsFileValid = ({
  validExtension,
  validSize,
}: FileData): boolean => {
  return validExtension && validSize;
};

export const isValidFiles = (
  frontFileData?: FileData,
  backFileData?: FileData,
): boolean | undefined => {
  if (frontFileData == undefined && backFileData == undefined) {
    return false;
  }

  if (frontFileData && backFileData)
    return checkIsFileValid(frontFileData) && checkIsFileValid(backFileData);
};

export const fileExtensionAndSizeIsValid = (fileData?: FileData): string => {
  if (fileData === undefined) return '';

  const valid = fileData?.validExtension && fileData?.validSize;

  return valid ? '' : 'error';
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

export const handleGTMTypeError = (
  name: string,
  size: number,
  validExtension?: boolean,
  validSize?: boolean,
) => {
  const fileInfo = `${formatBytes(size)}-${getExtensionType(name)}`;

  if (!validExtension && !validSize) {
    return `tamanho-e-extensao-invalido-${fileInfo}`;
  }

  return validExtension
    ? `extensao-invalida-${fileInfo}`
    : `tamanho-invalido-${fileInfo}`;
};
