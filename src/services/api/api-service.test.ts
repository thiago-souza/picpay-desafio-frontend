import '@testing-library/jest-dom/extend-expect';
import { getApi } from '.';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Should test getAttachments fetch method', () => {
  const apiService = getApi('token', 'globoId');

  it('should getAttachments have been called and return response', async () => {
    const expectedResponse = [{
      'type': 'CNH',
      'content': 'string',
      'status': 'active'
    }];

    jest.spyOn(apiService, 'getAttachments').mockImplementation(() => Promise.resolve(expectedResponse));

    const result = await apiService.getAttachments();
    expect(result).toEqual(expectedResponse);
    expect(apiService.getAttachments).toHaveBeenCalledTimes(1);
  });

  it('should getAttachments have been called and return error', async () => {
    jest.spyOn(apiService, 'getAttachments').mockImplementation(() => Promise.resolve(Error));

    const result = await apiService.getAttachments();
    expect(result).toEqual(Error);
    expect(apiService.getAttachments).toHaveBeenCalledTimes(1);
  });
});

describe('Should test upload fetch method', () => {
  const apiService = getApi('token', 'globoId');

  it('should upload have been called and return status code', async () => {
    jest.spyOn(apiService, 'upload').mockImplementation(() => Promise.resolve(200));

    const result = await apiService.upload('attach', 'type');
    expect(result).toEqual(200);
    expect(apiService.upload).toHaveBeenCalledTimes(1);
  });

  it('should upload have been called and return error code', async () => {
    jest.spyOn(apiService, 'upload').mockImplementation(() => Promise.resolve(Error));

    const result = await apiService.upload('attach', 'type');
    expect(result).toEqual(Error);
    expect(apiService.upload).toHaveBeenCalledTimes(1);
  });
});

describe('Should test getStatus fetch method', () => {
  const apiService = getApi('token', 'globoId');

  it('should get status method have been called and return the response', async () => {
    const expectedResponse = {
      'status': 'IN_PROCESS',
    };

    jest.spyOn(apiService, 'getStatus').mockImplementation(() => Promise.resolve(expectedResponse));

    const result = await apiService.getStatus();
    expect(result).toEqual(expectedResponse);
    expect(apiService.getStatus).toHaveBeenCalledTimes(1);
  });

  it('should get status method have been called and return error code', async () => {
    jest.spyOn(apiService, 'getStatus').mockImplementation(() => Promise.resolve(Error));

    const result = await apiService.getStatus();
    expect(result).toEqual(Error);
    expect(apiService.getStatus).toHaveBeenCalledTimes(1);
  });
});

describe('Should test verify fetch method', () => {
  const apiService = getApi('token', 'globoId');

  it('should verify method have been called and return status code', async () => {
    jest.spyOn(apiService, 'verify').mockImplementation(() => Promise.resolve(200));

    const result = await apiService.verify()
    expect(result).toEqual(200);
    expect(apiService.verify).toHaveBeenCalledTimes(1);
  });

  it('should verify method have been called and return error code', async () => {
    jest.spyOn(apiService, 'verify').mockImplementation(() => Promise.resolve(Error));

    const result = await apiService.verify();
    expect(result).toEqual(Error);
    expect(apiService.verify).toHaveBeenCalledTimes(1);
  });
});

describe('Should test IsGloboIdInExpressWhiteList method', () => {
  const apiService = getApi('token', 'globoId');

  it('should isGloboIdInExpressWhitelist method have been called and return the response', async () => {
    const expectedResponse = {
      'isMember': true,
    };

    jest.spyOn(apiService, 'IsGloboIdInExpressWhiteList').mockImplementation(() => Promise.resolve(expectedResponse));

    const result = await apiService.IsGloboIdInExpressWhiteList();
    expect(result).toEqual(expectedResponse);
    expect(apiService.IsGloboIdInExpressWhiteList).toHaveBeenCalledTimes(1);
  });

  it('should isGloboIdInExpressWhitelist method have been called and return error code', async () => {
    jest.spyOn(apiService, 'IsGloboIdInExpressWhiteList').mockImplementation(() => Promise.resolve(Error));

    const result = await apiService.IsGloboIdInExpressWhiteList();
    expect(result).toEqual(Error);
    expect(apiService.IsGloboIdInExpressWhiteList).toHaveBeenCalledTimes(1);
  });
});