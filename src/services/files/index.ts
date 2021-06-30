export const isFileExtensionValid = (fileName: string): boolean => {
  if (fileName.length <= 0) return true;

  const allowedExtensions = ['jpg', 'jpeg', 'bmp', 'png'];
  const fileEx = fileName.split('.').pop();
  if (fileEx == undefined) return false;

  return allowedExtensions.includes(fileEx);
};

export const fileContentsToBase64 = (binaryString: string) => {
  return btoa(binaryString);
};

export interface FileData {
  name: string;
  size: number;
  base64: string;
  validExtension: boolean;
}

export const getFileDataFromEvent = (
  event: React.ChangeEvent,
): Promise<FileData> => {
  const promise = new Promise<FileData>((resolve) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (readerEvt: any) => {
          const binaryString = readerEvt.target.result;
          const base64 = fileContentsToBase64(binaryString);

          const fileData: FileData = {
            name: file.name,
            size: file.size,
            validExtension: isFileExtensionValid(file.name),
            base64,
          };

          resolve(fileData);
        };
        reader.readAsBinaryString(file);
      }
    }
  });

  return promise;
};
