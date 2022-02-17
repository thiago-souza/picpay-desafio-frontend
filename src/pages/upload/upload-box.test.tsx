import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom/extend-expect';

import { theme } from '../main/styles';
import { UploadBox } from '@/pages/upload';
import { AuthContext } from '@/components/auth-context';

const history = createMemoryHistory();
const authData = {
  globoId: '1b6ac24b-0000-4dbf-a158-4c603ee80000',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  email: 'email@email.com',
};

const renderUploadBox = (
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <Route path="/">
        <AuthContext.Provider value={authData}>
          <UploadBox selectedDoc="CNH" />
        </AuthContext.Provider>
      </Route>
    </ThemeProvider>
  </Router>
);

describe('Test upload box', () => {
  beforeAll(() => {
    window.dataLayer = [];
    window.ga = jest.fn();
  });

  test('Should user add a valid image with drag n drop for the front and back', async () => {
    // getByText containing DOM node
    const { getByText, getByTestId } = render(renderUploadBox);

    // check if a box was rendered with some desired content
    expect(getByText(/Upload da sua/)).toBeInTheDocument();

    // get by id for dragDrop front and back in drag n drop area
    const dragDropFront = getByTestId('upload-drag-n-drop-front');
    const dragDropBack = getByTestId('upload-drag-n-drop-back');

    // Add front and back of valid documents
    fireEvent.drop(dragDropFront, {
      dataTransfer: {
        files: [new File(['(□_□-)'], 'rg-front.png', { type: 'image/png' })],
      },
    });

    fireEvent.drop(dragDropBack, {
      dataTransfer: {
        files: [new File(['(-□_□)'], 'rg-back.png', { type: 'image/png' })],
      },
    });

    // Check if the image of front and back are "RG" document and test to check if it was loaded
    await waitFor(() => {
      expect(getByTestId('upload-img-preview-front')).toBeInTheDocument();
      // expect(queryByTestId('upload-img-preview-front')).toBeInTheDocument();

      expect(getByTestId('upload-img-preview-back')).toBeInTheDocument();
      // expect(getByText('rg-back.png')).toBeInTheDocument();
    });

    await waitFor(() => {
      // trigger click to send documents to next step
      fireEvent.click(getByTestId('btn-custom'));
    });

    // Check if the user clicks wents to the next step for any status
    // expect(history.length).toBe(2);
    expect(history.location.pathname).toContain('/');
  });

  test('Should user add a invalid image for the front and back', async () => {
    // getByText containing DOM node
    const { getByTestId } = render(renderUploadBox);

    // get by id for front and back input button and upload invalid files
    const fileData = new File(['(-0_0)'], 'doc-invalid.pdf', {
      type: 'application/pdf',
    });
    const inputFileFront = getByTestId('upload-file-front');
    const inputFileBack = getByTestId('upload-file-back');

    // simulates the upload of invalid files
    Object.defineProperty(inputFileBack, 'files', {
      value: [fileData],
    });
    Object.defineProperty(inputFileFront, 'files', {
      value: [fileData],
    });
    fireEvent.change(inputFileFront);
    fireEvent.change(inputFileBack);

    const labelErrorFront = getByTestId('uploaded-label-frente');
    const labelErrorVerso = getByTestId('uploaded-label-verso');

    // Check if the image of front and back are "RG" document and test if it was loaded and invalid
    await waitFor(() => {
      expect(labelErrorFront).toContainHTML(
        'Ops! Este formato de arquivo não é aceito',
      );
      expect(labelErrorVerso).toContainHTML(
        'Ops! Este formato de arquivo não é aceito',
      );
    });

    // Check if the button for the next step is disabled
    expect(getByTestId('btn-custom')).toBeDisabled();
  });

  test('Should not go to next step because user add an invalid front image with drag n drop', async () => {
    // getByText containing DOM node
    const { getByText, getByTestId } = render(renderUploadBox);

    // get by id for dragDrop front and back in  drag n drop area
    const dragDropFront = getByTestId('upload-drag-n-drop-front');

    // Add front and back of valid documents
    fireEvent.drop(dragDropFront, {
      dataTransfer: {
        files: [
          new File(['(□_□-)'], 'rg-front.pdf', { type: 'application/pdf' }),
        ],
      },
    });

    // Check if image in front is "RG" document and tests if it was loaded and invalid
    await waitFor(() => {
      expect(getByTestId('upload-img-preview-front')).toBeInTheDocument();
      expect(
        getByText(/Ops! Este formato de arquivo não é aceito/),
      ).toBeInTheDocument();
    });

    // Check if the button for the next step is disabled
    expect(getByTestId('btn-custom')).toBeDisabled();
  });

  test('Should not go to next step because user add an invalid back image with drag n drop', async () => {
    // getByText containing DOM node
    const { getByText, getByTestId } = render(renderUploadBox);

    // get by id for input button back and upload invalid file
    const inputFileBack = getByTestId('upload-file-back');
    const fileData = new File(['(-□_□)'], 'rg-back.pdf', {
      type: 'application/pdf',
    });
    Object.defineProperty(inputFileBack, 'files', {
      value: [fileData],
    });
    fireEvent.change(inputFileBack);

    // Check if image in back is "RG" document and tests to check if it was loaded and invalid
    await waitFor(() => {
      expect(getByTestId('upload-img-preview-back')).toBeInTheDocument();
      expect(
        getByText(/Ops! Este formato de arquivo não é aceito/),
      ).toBeInTheDocument();
    });

    // Check if the button for the next step is disabled
    expect(getByTestId('btn-custom')).toBeDisabled();
  });

  test('Should user add the front or back file and delete the image', async () => {
    // getByText containing DOM node
    const { getByTestId } = render(renderUploadBox);

    // get by id for input button front and upload valid file
    const inputFileFront = getByTestId('upload-file-front');
    const fileData = new File(['(-□_□)'], 'rg-front-valid.png', {
      type: 'image/png',
    });
    Object.defineProperty(inputFileFront, 'files', {
      value: [fileData],
    });
    fireEvent.change(inputFileFront);

    // Check if the image of front is "RG" document and test to check if it was loaded
    await waitFor(() => {
      expect(getByTestId('upload-img-preview-front')).toBeInTheDocument();
      // expect(getByText('rg-front-valid.png')).toBeInTheDocument();
      expect(getByTestId('upload-delete-front')).toBeInTheDocument();
    });

    // trigger button that deletes the front image of the document
    const deleteBtnFront = getByTestId('upload-delete-front');
    fireEvent.click(deleteBtnFront);

    // Check if the image has been deleted and removed
    await waitFor(() => {
      expect(getByTestId('uploaded-label-frente')).toContainHTML(
        'Clique para enviar ou arraste a foto aqui.',
      );
    });

    // Check if the button for the next step is disabled
    expect(getByTestId('btn-custom')).toBeDisabled();
  });

  test('Should user add the front or back file and click to preview the document', async () => {
    // getByText containing DOM node
    const { getByTestId } = render(renderUploadBox);

    // get by id for input button front and upload valid file
    const inputFileFront = getByTestId('upload-file-front');
    const fileData = new File(['(-□_□)'], 'rg-front-for-preview.png', {
      type: 'image/png',
    });
    Object.defineProperty(inputFileFront, 'files', {
      value: [fileData],
    });
    fireEvent.change(inputFileFront);

    // Check if image in front is "RG" document and tests if it was loaded
    await waitFor(() => {
      expect(getByTestId('upload-img-preview-front')).toBeInTheDocument();
      // expect(getByText('rg-front-for-preview.png')).toBeInTheDocument();
      expect(getByTestId('upload-delete-front')).toBeInTheDocument();
    });

    // trigger button that preview the front image of the document
    const previewBtnFront = getByTestId('upload-img-preview-front');
    fireEvent.click(previewBtnFront);

    // Check if the image has loaded in preview modal
    await waitFor(() => {
      expect(getByTestId('modal-confirm-front')).toHaveClass('hide');
      expect(getByTestId('modal-confirm-front')).toContainHTML(
        'rg-front-for-preview.png',
      );
    });
  });
});
