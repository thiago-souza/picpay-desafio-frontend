import '@testing-library/jest-dom/extend-expect';
import { getPageFromStatus } from '.';
import { checkAuthIsInvalid } from './onboarding';

describe('Test auth is invalid or valid', () => {
  test('Should auth is inValid to next step', () => {
    const authData = {
      globoId: '',
      token: '',
      email: '',
    };

    const result = checkAuthIsInvalid(authData);
    expect(result).toBeTruthy();
  });

  test('Should auth is valid to return', () => {
    const authData = {
      globoId: '000000023323',
      token: '010101001011',
      email: 'email@email.com',
    };

    const result = checkAuthIsInvalid(authData);
    expect(result).toBeFalsy();
  });
});

describe('Test get page from status', () => {
  test('Should return still_in_process', () => {
    const result = getPageFromStatus(200, 'in_process');
    expect(result).toBe("status/still_in_process");
  });

  test('Should return select', () => {
    const result = getPageFromStatus(200, 'created');
    expect(result).toBe("select");
  });

  test('Should return active', () => {
    const result = getPageFromStatus(200, 'active');
    expect(result).toBe("status/active");
  });

  test('Should return approved', () => {
    const result = getPageFromStatus(200, 'approved');
    expect(result).toBe("status/approved");
  });

  test('Should return suspected', () => {
    const result = getPageFromStatus(200, 'suspected');
    expect(result).toBe("status/suspected");
  });

  test('Should return rejected', () => {
    const result = getPageFromStatus(200, 'rejected');
    expect(result).toBe("status/rejected");
  });

  test('Should return rejected', () => {
    const result = getPageFromStatus(200, 'error');
    expect(result).toBe("status/error");
  });

  test('Should return select from statuscode 201', () => {
    const result = getPageFromStatus(201, '');
    expect(result).toBe('select');
  });

  test('Should return select from statuscode 204', () => {
    const result = getPageFromStatus(204, '');
    expect(result).toBe('select');
  });
})