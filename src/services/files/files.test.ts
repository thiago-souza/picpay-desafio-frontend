import '@testing-library/jest-dom/extend-expect';
import {
  fileExtensionAndSizeIsValid,
  handleGTMTypeError,
  isFileExtensionValid,
  isFileSizeValid,
  isValidFiles,
} from '.';

describe('Test if file extension is valid or invalid', () => {
  test('Should return the file extensions is valid for jpg', () => {
    const result = isFileExtensionValid('file.jpg');
    expect(result).toBeTruthy();
  });

  test('Should return the file extensions is valid for jpeg', () => {
    const result = isFileExtensionValid('file.jpeg');
    expect(result).toBeTruthy();
  });

  test('Should return the file extensions is valid for jpeg', () => {
    const result = isFileExtensionValid('file.bmp');
    expect(result).toBeTruthy();
  });

  test('Should return the file extensions is valid for jpeg', () => {
    const result = isFileExtensionValid('file.png');
    expect(result).toBeTruthy();
  });

  test('Should return the file extensions is invalid for pdf', () => {
    const result = isFileExtensionValid('file.pdf');
    expect(result).toBeFalsy();
  });
});

describe('Test if is file size valid', () => {
  test('Should return the file size is valid', () => {
    const result = isFileSizeValid(3145728 - 1000);
    expect(result).toBeTruthy();
  });

  test('Should return the file size is invalid', () => {
    const result = isFileSizeValid(3145728 + 1000);
    expect(result).toBeFalsy();
  });
});

describe('Test if file is valid', () => {
  test('Should return that file is valid', () => {
    const frontFileData = {
      name: 'frontFile.png',
      size: 3145728 - 1000,
      base64: 'base64',
      validExtension: true,
      validSize: true,
    };

    const backFileData = {
      name: 'backFile.png',
      size: 3145728 - 1000,
      base64: 'base64',
      validExtension: true,
      validSize: true,
    };

    const result = isValidFiles(frontFileData, backFileData);
    expect(result).toBeTruthy();
  });

  test('Should return that file is invalid', () => {
    const frontFileData = {
      name: 'frontFile.png',
      size: 3145728 - 1000,
      base64: 'base64',
      validExtension: false,
      validSize: false,
    };

    const backFileData = {
      name: 'backFile.png',
      size: 3145728 - 1000,
      base64: 'base64',
      validExtension: false,
      validSize: false,
    };

    const result = isValidFiles(frontFileData, backFileData);
    expect(result).toBeFalsy();
  });
});

describe('Test if the extension and size is valid to return the correct class', () => {
  test('Should return that extension and size is valid', () => {
    const fileData = {
      name: 'file.png',
      size: 3145728 - 1000,
      base64: 'base64',
      validExtension: true,
      validSize: true,
    };

    const result = fileExtensionAndSizeIsValid(fileData);
    expect(result).toBe('');
  });

  test('Should return that extension and size is invalid', () => {
    const fileData = {
      name: 'file.png',
      size: 3145728 - 1000,
      base64: 'base64',
      validExtension: false,
      validSize: false,
    };

    const result = fileExtensionAndSizeIsValid(fileData);
    expect(result).toBe('error');
  });
});

describe('Test if the handleGTMTypeError returns the correct type of error', () => {
  test('should return that extension and size is invalid', () => {
    const result = handleGTMTypeError('file', 100, false, false);
    expect(result).toBe('extensao-e-tamanho-invalido');
  });

  test('should return that extension is invalid', () => {
    const result = handleGTMTypeError('file', 10000, false, true);
    expect(result).toBe('extensao-invalida');
  });

  test('should return that size is invalid', () => {
    const result = handleGTMTypeError('file', 1000, true, false);
    expect(result).toBe('tamanho-invalido');
  });
});
