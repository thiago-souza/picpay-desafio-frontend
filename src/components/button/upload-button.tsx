import * as React from 'react';
import { UploadButtonStyle } from './button.style';
import {
  ImgPreviewStyle,
  DeleteButtonStyle,
} from '@/pages/upload/upload.style';
import { FileData, getFileDataFromEvent } from '@/services/files';
import DeleteIcon from '@/assets/icons/delete-icon.png';

interface IUploadButton {
  id?: string;
  fileData?: FileData;
  onFileSelected: (fileData: FileData) => void;
  callbackDeleteFile: () => void;
  children: React.ReactNode;
}

export const UploadButton: React.FC<IUploadButton> = (props: IUploadButton) => {
  const { id = 'file', children, callbackDeleteFile, fileData } = props;

  const isValid = props.fileData?.validExtension;
  const contentValues = {
    content: isValid ? '✓' : '!',
    color: isValid ? '#26ca5e' : '#c22d1e',
  };

  const imgPreviewRender = (base64?: string) => {
    return base64 ? `data:image/png;base64, ${base64}` : '';
  };

  const handleChange = (event: React.ChangeEvent): void => {
    getFileDataFromEvent(event).then((data) => props.onFileSelected(data));
  };

  return (
    <UploadButtonStyle>
      <ImgPreviewStyle
        className={`${props.fileData?.base64 ? 'active' : ''}`}
        {...contentValues}
      >
        <img src={imgPreviewRender(props.fileData?.base64)} />
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
        // accept="image/png, image/jpeg, image/bmp"
      />
      <label className={`${fileData ? 'trim' : ''}`} htmlFor={id}>
        {children}
      </label>

      <DeleteButtonStyle
        onClick={() => callbackDeleteFile()}
        className={` ${props.fileData?.base64 ? 'active' : ''}`}
      >
        <img src={DeleteIcon} />
      </DeleteButtonStyle>
    </UploadButtonStyle>
  );
};
