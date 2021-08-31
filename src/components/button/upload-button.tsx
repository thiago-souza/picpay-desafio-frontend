import * as React from 'react';
import { UploadButtonDragNDrop, UploadButtonStyle } from './button.style';
import {
  ImgPreviewStyle,
  DeleteButtonStyle,
} from '@/pages/upload/upload.style';
import { FileData, getFileDataFromEvent } from '@/services/files';
import DeleteIcon from '@/assets/icons/delete-icon.png';
import { Modal } from '@/components/modal';
import { ModalStylePreview } from '../modal/modal.style';

interface IUploadButton {
  id?: string;
  fileData?: FileData;
  onFileSelected: (fileData: FileData) => void;
  callbackDeleteFile: () => void;
  callbackImgPreview: () => void;
  onClickEvent?: () => void;
  isShownModal?: boolean;
  typeFile: string;
  children: React.ReactNode;
}

export const UploadButton: React.FC<IUploadButton> = (props: IUploadButton) => {
  const {
    id = 'file',
    children,
    callbackDeleteFile,
    callbackImgPreview,
    onClickEvent,
    isShownModal,
    typeFile,
    fileData,
  } = props;

  const uploadButtonRef = React.useRef(null);

  const isValid = props.fileData?.validExtension;
  const contentValues = {
    content: isValid ? '✓' : '!',
    color: isValid ? '#26ca5e' : '#c22d1e',
  };

  const imgPreviewRender = (base64?: string) => {
    //console.log('base64: ', base64);
    return base64 ? `data:image/png;base64, ${base64}` : '';
  };

  const handleChange = (event: React.ChangeEvent): void => {
    getFileDataFromEvent(event, null).then((data) => props.onFileSelected(data));
  };

  const handleUploadButtonHoverStyle = (backgroundColor: string, border: string) => {
    if (uploadButtonRef && uploadButtonRef.current) {
      uploadButtonRef.current.style.backgroundColor = backgroundColor;
      uploadButtonRef.current.style.borderColor = border;
    }
  }

  const eDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    handleUploadButtonHoverStyle('rgba(255, 116, 0, 0.1)', '#FF7400');
  }

  const eDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    handleUploadButtonHoverStyle('white', '#d5d5d5');
  }


  const eDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      getFileDataFromEvent(e, files[0]).then((data) => {
        props.onFileSelected(data);
      });
    }

    handleUploadButtonHoverStyle('white', '#d5d5d5');
  }

  return (
    <UploadButtonDragNDrop
      ref={uploadButtonRef}
      className='upload-button'
      onDragOver={eDragOver}
      onDragLeave={eDragLeave}
      onDrop={eDrop}
    >
      <UploadButtonStyle>
        <Modal isShown={isShownModal} hide={callbackImgPreview} data-clarity-mask="true">
          <>
            <ModalStylePreview>
              <img src={imgPreviewRender(props.fileData?.base64)} />
            </ModalStylePreview>
            <p>
              {typeFile}: {props.fileData?.name}
            </p>
          </>
        </Modal>
        <ImgPreviewStyle
          className={`${props.fileData?.base64 ? 'active' : ''}`}
          {...contentValues}
          onClick={callbackImgPreview}
          data-clarity-mask="true"
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
            if (onClickEvent) onClickEvent();
          }}
          accept="image/png, image/jpeg, image/bmp"
          data-clarity-mask="true"
        />
        <label className={`${fileData ? 'trim' : ''}`} htmlFor={id} id="labelTeste" style={{ display: 'block' }}>
          {children}
        </label>

        <DeleteButtonStyle
          onClick={() => callbackDeleteFile()}
          className={` ${props.fileData?.base64 ? 'active' : ''}`}
        >
          <img src={DeleteIcon} />
        </DeleteButtonStyle>
      </UploadButtonStyle>
    </UploadButtonDragNDrop>
  );
};

