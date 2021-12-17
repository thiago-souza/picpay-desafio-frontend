import '@testing-library/jest-dom/extend-expect';
import getRedirectUrl from '.';

describe('Test get redirect url for accounts/status endpoint', () => {
  test('Should return the status page for status code 200', () => {
    const result = getRedirectUrl('accounts/status', 200);
    expect(result).toBe('status/');
  });

  test('Should return the select page for the status code 201', () => {
    const result = getRedirectUrl('accounts/status', 201);
    expect(result).toBe('select');
  });

  test('Should return the select page for the status code 204', () => {
    const result = getRedirectUrl('accounts/status', 204);
    expect(result).toBe('/');
  });
});

describe('Test get redirect url for accounts/attachments endpoint', () => {
  test('Should return the verify page for status code 201', () => {
    const result = getRedirectUrl('accounts/attachments', 201);
    expect(result).toBe('verify');
  });

  test('Should return the verify page for status code 202', () => {
    const result = getRedirectUrl('accounts/attachments', 202);
    expect(result).toBe('verify');
  });

  test('Should return the suspected page for status code 412', () => {
    const result = getRedirectUrl('accounts/attachments', 412);
    expect(result).toBe('status/suspected');
  });

  test('Should return the approved page for status code 417', () => {
    const result = getRedirectUrl('accounts/attachments', 417);
    expect(result).toBe('status/approved');
  });

  test('Should return the in_process page for status code 423', () => {
    const result = getRedirectUrl('accounts/attachments', 423);
    expect(result).toBe('status/in_process');
  });
});

describe('Test get redirect url for accounts/verify endpoint', () => {
  test('Should return the status page approved for status code 200', () => {
    const result = getRedirectUrl('accounts/verify', 200);
    expect(result).toBe('status/approved');
  });

  test('Should return the status page in_process for status code 201', () => {
    const result = getRedirectUrl('accounts/verify', 201);
    expect(result).toBe('status/in_process');
  });

  test('Should return the status page in_process for status code 202', () => {
    const result = getRedirectUrl('accounts/verify', 202);
    expect(result).toBe('status/in_process');
  });

  test('Should return the page select for status code 409', () => {
    const result = getRedirectUrl('accounts/verify', 409);
    expect(result).toBe('select');
  });

  test('Should return the status page suspected for status code 412', () => {
    const result = getRedirectUrl('accounts/verify', 412);
    expect(result).toBe('status/suspected');
  });

  test('Should return the page select for status code 417', () => {
    const result = getRedirectUrl('accounts/verify', 417);
    expect(result).toBe('select');
  });

  test('Should return the status page is_pending for status code 424', () => {
    const result = getRedirectUrl('accounts/verify', 424);
    expect(result).toBe('status/is_pending');
  });
});