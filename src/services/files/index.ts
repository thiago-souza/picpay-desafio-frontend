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
            base64,
            validExtension: isFileExtensionValid(file.name),
            validSize: isFileSizeValid(file.size),
          };

          resolve(fileData);
        };
        reader.readAsBinaryString(file);
      }
    }
  });

  return promise;
};

export const getFileDataFromDropEvent = (file: any) : Promise<FileData> => {
  const promise = new Promise<FileData>((resolve) => {

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvt: any) => {
      //console.log(' >>>>>>>>>>>>> base64: ', reader.result);//base64encoded string
      //const binaryString = readerEvt.target.result;
      //const base64 = fileContentsToBase64(binaryString);

      let base64 = reader.result?.toString() || '';
      base64 = base64.replace('data:image/png;base64,', '');

      const fileData: FileData = {
        name: file.name,
        size: file.size,
        base64,
        validExtension: isFileExtensionValid(file.name),
        validSize: isFileSizeValid(file.size),
      };

      resolve(fileData);
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  });

  return promise;
}
