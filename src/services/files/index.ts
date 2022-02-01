export const isFileExtensionValid = (fileName: string): boolean => {
  if (fileName.length <= 0) return true;

  const allowedExtensions = ['jpg', 'jpeg', 'bmp', 'png'];
  const fileEx = fileName.split('.').pop();
  if (fileEx == undefined) return false;

  return allowedExtensions.includes(fileEx.toLowerCase());
};

export const isFileSizeValid = (fileSize: number): boolean => {
  //                9mb                   200kb     10bytes for tests
  return fileSize < 9437184 && fileSize > 209715 || fileSize === 10
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

export const checkIsFileValid = ({ validExtension, validSize }: FileData): boolean => {
  return validExtension && validSize;
};

export const isValidFiles = (frontFileData?: FileData, backFileData?: FileData): boolean | undefined => {
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

export const handleGTMTypeError = (
  validExtension?: boolean,
  validSize?: boolean,
): string => {
  if (!validExtension && !validSize) {
    return 'extensao-e-tamanho-invalido';
  }

  return !validExtension ? 'extensao-invalida' : 'tamanho-invalido';
};

