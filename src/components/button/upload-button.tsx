import * as React from 'react';
import { UploadButtonStyle } from './button.style';
import {
  ImgPreviewStyle,
  DeleteButtonStyle,
} from '@/pages/upload/upload.style';
import DeleteIcon from '@/assets/icons/delete-icon.png';

interface IUploadButton {
  id?: string;
  callbackDeleteFile: (fileId: string) => void;
  fileUploadedBase64: (fileBase64: string, fileId: string) => void;
  children: React.ReactNode;
  fileUploadedParams: (params: any, fileId: string) => void;
  previewImg?: string;
  contentValues: any;
}

export const UploadButton: React.FC<IUploadButton> = (props: IUploadButton) => {
  const {
    id = 'file',
    children,
    callbackDeleteFile,
    fileUploadedBase64,
    fileUploadedParams,
    previewImg,
    contentValues,
  } = props;

  const handleReaderLoaded = (readerEvt: any) => {
    const binaryString = readerEvt.target.result;
    fileUploadedBase64(btoa(binaryString), id);
  };

  const imgPreviewRender = (base64?: string) => {
    return base64 ? `data:image/png;base64, ${base64}` : '';
  };

  const handleChange = (event: React.ChangeEvent): void => {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      const file = input.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = handleReaderLoaded;
        fileUploadedParams({ name: file.name, size: file.size }, id);
        reader.readAsBinaryString(file);
      }
    }
  };

  return (
    <UploadButtonStyle>
      <ImgPreviewStyle
        className={`${previewImg ? 'active' : ''}`}
        {...contentValues}
      >
        <img src={imgPreviewRender(previewImg)} />
      </ImgPreviewStyle>
      <input
        type="file"
        id={id}
        name={id}
        onChange={handleChange}
        onClick={(event: React.MouseEvent) => {
          const target = event.currentTarget as HTMLInputElement;
          target.value = '';
        }}
        accept="image/png, image/jpeg, image/bmp"
      />
      <label htmlFor={id}>{children}</label>

      <DeleteButtonStyle
        onClick={() => callbackDeleteFile(id)}
        className={` ${previewImg ? 'active' : ''}`}
      >
        <img src={DeleteIcon} />
      </DeleteButtonStyle>
    </UploadButtonStyle>
  );
};
