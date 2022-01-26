export class ApiService {
  apiURL: string;
  cartolaApiURL: string;
  token: string;
  globoId: string;
  header: any;

  constructor(token: string, globoId: string, apiUrl?: string, cartolaApiUrl?: string) {
    this.apiURL = process.env.API_URL || (apiUrl || '');
    this.cartolaApiURL = process.env.CARTOLA_API_URL || (cartolaApiUrl || '');
    this.token = token;
    this.globoId = globoId;
    this.header = {
      Authorization: 'Bearer ' + this.token,
      'X-Globo-Id': this.globoId,
    };
  }

  /*
    Get status on the user document
  */
  async getAttachments(): Promise<any> {
    if (!this.apiURL) {
      throw new Error('apiURL is empty');
    }

    if (!this.globoId) {
      throw new Error('globoId is empty');
    }

    if (!this.token) {
      throw new Error('token is empty');
    }

    return await fetch(`${this.apiURL}/accounts/attachments`, {
      method: 'GET',
      headers: this.header,
    }).then((res) => res.json()).then((response) => {
      if (!Array.isArray(response) && Object.keys(response).length === 0) {
        throw new Error();
      }

      return response;
    });
  }

  /*
    Upload attachment document
  */
  async upload(attach: string, type: string): Promise<any> {
    if (!this.apiURL) {
      throw new Error('apiURL is empty');
    }

    if (!this.globoId) {
      throw new Error('globoId is empty');
    }

    if (!this.token) {
      throw new Error('token is empty');
    }

    const req = {
      content: attach,
      type: type,
    };

    return await fetch(`${this.apiURL}/accounts/attachments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.header,
      },
      body: JSON.stringify(req),
    }).then(async (res) => {
      return { statusCode: res.status };
    }).then((response) => {
      if (!Array.isArray(response) && Object.keys(response).length === 0) {
        throw new Error();
      }

      return response;
    });
  }

  /*
    Get Status on the user document
  */
  async getStatus(): Promise<any> {
    if (!this.apiURL) {
      throw new Error('apiURL is empty');
    }

    if (!this.globoId) {
      throw new Error('globoId is empty');
    }

    if (!this.token) {
      throw new Error('token is empty');
    }

    return await fetch(`${this.apiURL}/accounts/status`, {
      method: 'GET',
      headers: this.header,
    }).then(async (res) => {
      if (res.status == 204) {
        return { statusCode: res.status };
      }
      else {
        const data = await res.json();
        return { statusCode: res.status, status: data?.status };
      }
    }).then((response) => {
      if (!Array.isArray(response) && Object.keys(response).length === 0) {
        throw new Error();
      }

      return response;
    });
  }

  /*
    Start KYC with IdWall process
  */
  async verify(): Promise<any> {
    if (!this.apiURL) {
      throw new Error('apiURL is empty');
    }

    if (!this.globoId) {
      throw new Error('globoId is empty');
    }

    if (!this.token) {
      throw new Error('token is empty');
    }

    return await fetch(`${this.apiURL}/accounts/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.header,
      },
    }).then(async (res) => {
      return { statusCode: res.status };
    }).then((response) => {
      if (!Array.isArray(response) && Object.keys(response).length === 0) {
        throw new Error();
      }

      return response;
    });
  }

  /*
    Verify if the globoId belongs to express whitelist
  */
  async IsGloboIdInExpressWhiteList(): Promise<any> {
    if (!this.cartolaApiURL) {
      throw new Error('cartolaApiURL is empty');
    }

    if (!this.globoId) {
      throw new Error('globoId is empty');
    }

    if (!this.token) {
      throw new Error('token is empty');
    }

    return await fetch(`${this.cartolaApiURL}/auth/express`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.header.Authorization
      },
    }).then((res) => res.json()).then((response) => {
      if (!Array.isArray(response) && Object.keys(response).length === 0) {
        throw new Error();
      }

      return response;
    });
  }
}

let instance: ApiService;

export function getApi(token: string, globoId: string, apiUrl?: string, cartolaApiUrl?: string): ApiService {
  if (!instance) {
    instance = new ApiService(token, globoId, apiUrl, cartolaApiUrl);
  }
  return instance;
}

export default getApi;