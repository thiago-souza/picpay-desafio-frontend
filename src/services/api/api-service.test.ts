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
  })
})

