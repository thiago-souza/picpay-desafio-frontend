import '@testing-library/jest-dom/extend-expect';
import { getApi } from '.';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Tests on getAttachments", () => {
  test("GET: Attachments should return expected response", async () => {
    const expectedResponse = {
      data: [
        {
          'content': 'string',
          'status': 'active',
          'type': 'CNH',
        }
      ],
      statusCode: 200,
    };

    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.getAttachments();
    expect(result).toEqual(expectedResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("GET: Attachments should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("API is down")));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.getAttachments();

    expect(result.message).toEqual("API is down");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("GET: Attachments should return exception - apiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("apiURL is empty")));

    const apiService = getApi('token', 'globoId', '', 'cartolaApiUrl');
    const result = await apiService.getAttachments();

    expect(result.message).toEqual("apiURL is empty");
  });

  test("GET: Attachments should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.getAttachments();

    expect(result.message).toEqual("globoId is empty");
  });

  test("GET: Attachments should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.getAttachments();

    expect(result.message).toEqual("token is empty");
  });
});

describe("Tests on upload", () => {
  test("POST: upload should return expected response", async () => {
    const expectedResponse = {
      statusCode: 200
    };

    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.upload('attach', 'type');
    expect(result).toEqual(expectedResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("POST: upload should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("API is down")));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.upload('attach', 'type');

    expect(result.message).toEqual("API is down");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("POST: upload should return exception - apiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("apiURL is empty")));

    const apiService = getApi('token', 'globoId', '', 'cartolaApiUrl');
    const result = await apiService.upload('attach', 'type');

    expect(result.message).toEqual("apiURL is empty");
  });

  test("POST: upload should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.upload('attach', 'type');

    expect(result.message).toEqual("globoId is empty");
  });

  test("POST: upload should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.upload('attach', 'type');

    expect(result.message).toEqual("token is empty");
  });
});

describe("Tests on getStatus", () => {
  test("GET: getStatus should return expected response", async () => {
    const expectedResponse = {
      status: 'IN_PROCESS',
      statusCode: 200,
    };

    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.getStatus();
    expect(result).toEqual(expectedResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("GET: getStatus should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("API is down")));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.getStatus();

    expect(result.message).toEqual("API is down");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("GET: getStatus should return exception - apiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("apiURL is empty")));

    const apiService = getApi('token', 'globoId', '', 'cartolaApiUrl');
    const result = await apiService.getStatus();

    expect(result.message).toEqual("apiURL is empty");
  });

  test("GET: getStatus should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.getStatus();

    expect(result.message).toEqual("globoId is empty");
  });

  test("GET: getStatus should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.getStatus();

    expect(result.message).toEqual("token is empty");
  });
});

describe("Tests on verify", () => {
  test("POST: verify should return expected response", async () => {
    const expectedResponse = {
      statusCode: 200,
    };

    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.verify();
    expect(result).toEqual(expectedResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("POST: verify should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("API is down")));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.verify();

    expect(result.message).toEqual("API is down");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("POST: verify should return exception - apiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("apiURL is empty")));

    const apiService = getApi('token', 'globoId', '', 'cartolaApiUrl');
    const result = await apiService.verify();

    expect(result.message).toEqual("apiURL is empty");
  });

  test("POST: verify should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.verify();

    expect(result.message).toEqual("globoId is empty");
  });

  test("POST: verify should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.verify();

    expect(result.message).toEqual("token is empty");
  });
});

describe("Tests on IsGloboIdInExpressWhiteList", () => {
  test("GET: isGloboIdInExpressWhiteList should return expected response", async () => {
    const expectedResponse = {
      isMember: true,
    };

    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.IsGloboIdInExpressWhiteList();
    expect(result).toEqual(expectedResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("GET: isGloboIdInExpressWhiteList should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("API is down")));

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.IsGloboIdInExpressWhiteList();

    expect(result.message).toEqual("API is down");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("GET: isGloboIdInExpressWhiteList should return exception - cartolaApiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("cartolaApiURL is empty")));

    const apiService = getApi('token', 'globoId', 'apiURL', '');
    const result = await apiService.IsGloboIdInExpressWhiteList();

    expect(result.message).toEqual("cartolaApiURL is empty");
  });

  test("GET: isGloboIdInExpressWhiteList should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.IsGloboIdInExpressWhiteList();

    expect(result.message).toEqual("globoId is empty");
  });

  test("GET: isGloboIdInExpressWhiteList should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    const result = await apiService.IsGloboIdInExpressWhiteList();

    expect(result.message).toEqual("token is empty");
  });
});