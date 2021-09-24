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
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.getAttachments()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual(expectedResponse);
      });
  });

  test("GET: Attachments should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.getAttachments()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error);
      });
  });

  test("GET: Attachments should return exception - apiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("apiURL is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', '', 'cartolaApiUrl');
    return await apiService.getAttachments()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("apiURL is empty"));
      });
  });

  test("GET: Attachments should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    return await apiService.getAttachments()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("globoId is empty"));
      });
  });

  test("GET: Attachments should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.getAttachments()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("token is empty"));
      });
  });
});

describe("Tests on upload", () => {
  test("POST: upload should return expected response", async () => {
    const expectedResponse = {
      statusCode: 200
    };

    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.upload('attach', 'type')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual(expectedResponse);
      });
  });

  test("POST: upload should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.upload('attach', 'type')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error);
      });
  });

  test("POST: upload should return exception - apiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("apiURL is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', '', 'cartolaApiUrl');
    return await apiService.upload('attach', 'type')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("apiURL is empty"));
      });
  });

  test("POST: upload should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    return await apiService.upload('attach', 'type')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("globoId is empty"));
      });
  });

  test("POST: upload should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.upload('attach', 'type')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("token is empty"));
      });
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
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.getStatus()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual(expectedResponse);
      });
  });

  test("GET: getStatus should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.getStatus()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error);
      });
  });

  test("GET: getStatus should return exception - apiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("apiURL is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', '', 'cartolaApiUrl');
    return await apiService.getStatus()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("apiURL is empty"));
      });
  });

  test("GET: getStatus should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    return await apiService.getStatus()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("globoId is empty"));
      });
  });

  test("GET: getStatus should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.getStatus()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("token is empty"));
      });
  });
});

describe("Tests on verify", () => {
  test("POST: verify should return expected response", async () => {
    const expectedResponse = {
      statusCode: 200,
    };

    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.verify()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual(expectedResponse);
      });
  });

  test("POST: verify should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.verify()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error);
      });
  });

  test("POST: verify should return exception - apiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("apiURL is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', '', 'cartolaApiUrl');
    return await apiService.verify()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("apiURL is empty"));
      });
  });

  test("POST: verify should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    return await apiService.verify()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("globoId is empty"));
      });
  });

  test("POST: verify should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return await apiService.verify()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("token is empty"));
      });
  });
});

describe("Tests on IsGloboIdInExpressWhiteList", () => {
  test("GET: isGloboIdInExpressWhiteList should return expected response", async () => {
    const expectedResponse = {
      isMember: true,
    };

    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return apiService.IsGloboIdInExpressWhiteList()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual(expectedResponse);
      });
  });

  test("GET: isGloboIdInExpressWhiteList should return exception - API is down", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return apiService.IsGloboIdInExpressWhiteList()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error);
      });
  });

  test("GET: isGloboIdInExpressWhiteList should return exception - cartolaApiURL is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("cartolaApiURL is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', 'globoId', 'apiURL', '');
    return apiService.IsGloboIdInExpressWhiteList()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("cartolaApiURL is empty"));
      });
  });

  test("GET: isGloboIdInExpressWhiteList should return exception - globoId is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("globoId is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('token', '', 'apiUrl', 'cartolaApiUrl');
    return apiService.IsGloboIdInExpressWhiteList()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("globoId is empty"));
      });
  });

  test("GET: isGloboIdInExpressWhiteList should return exception - token is empty", async () => {
    //@ts-ignore
    fetch.mockReject(() => Promise.reject(Error("token is empty")));
    const onResponse = jest.fn();
    const onError = jest.fn();

    const apiService = getApi('', 'globoId', 'apiUrl', 'cartolaApiUrl');
    return apiService.IsGloboIdInExpressWhiteList()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toEqual(Error("token is empty"));
      });
  });
});