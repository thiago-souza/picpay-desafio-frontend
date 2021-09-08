export const isFileExtensionValid = (fileName: string): boolean => {
  if (fileName.length <= 0) return true;

  const allowedExtensions = ['jpg', 'jpeg', 'bmp', 'png'];
  const fileEx = fileName.split('.').pop();
  if (fileEx == undefined) return false;

  return allowedExtensions.includes(fileEx);
};

export const isFileSizeValid = (fileSize: number): boolean => {
  const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);
  console.log(`${sizeInMB} MB`);

  return fileSize < 3145728; //3mb
};

export const fileContentsToBase64 = (binaryString: string) => {
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

const checkIsFileValid = ({ validExtension, validSize }: FileData) => {
  return validExtension && validSize;
};

export const isValidFiles = (frontFileData?: FileData, backFileData?: FileData) => {
  if (frontFileData == undefined && backFileData == undefined) return false;

  if (frontFileData && backFileData)
    return checkIsFileValid(frontFileData) && checkIsFileValid(backFileData);
};

export const fileExtensionAndSizeIsValid = (fileData?: FileData) => {
  if (fileData === undefined) return '';

  const valid = fileData?.validExtension && fileData?.validSize;

  return valid ? '' : 'error';
};