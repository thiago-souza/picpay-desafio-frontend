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
      return Error('apiURL is empty');
    }

    if (!this.globoId) {
      return Error('globoId is empty');
    }

    if (!this.token) {
      return Error('token is empty');
    }

    try {
      const result = await fetch(`${this.apiURL}/accounts/attachments`, {
        method: 'GET',
        headers: this.header,
      });

      return await result.json();
    } catch (e: any) {
      return e;
    }
  }

  /*
    Upload attachment document
  */
  async upload(attach: string, type: string): Promise<any> {
    if (!this.apiURL) {
      return Error('apiURL is empty');
    }

    if (!this.globoId) {
      return Error('globoId is empty');
    }

    if (!this.token) {
      return Error('token is empty');
    }

    try {
      const req = {
        content: attach,
        type: type,
      };

      const result = await fetch(`${this.apiURL}/accounts/attachments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.header,
        },
        body: JSON.stringify(req),
      });
      return { statusCode: result.status };
    } catch (e: any) {
      return e;
    }
  }

  /*
    Get Status on the user document
  */
  async getStatus(): Promise<any> {
    if (!this.apiURL) {
      return Error('apiURL is empty');
    }

    if (!this.globoId) {
      return Error('globoId is empty');
    }

    if (!this.token) {
      return Error('token is empty');
    }

    try {
      const result = await fetch(`${this.apiURL}/accounts/status`, {
        method: 'GET',
        headers: this.header,
      });

      const json = await result.json();
      return { statusCode: result.status, status: json.status };
    } catch (e: any) {
      return e;
    }
  }

  /*
    Start KYC with IdWall process
  */
  async verify(): Promise<any> {
    if (!this.apiURL) {
      return Error('apiURL is empty');
    }

    if (!this.globoId) {
      return Error('globoId is empty');
    }

    if (!this.token) {
      return Error('token is empty');
    }

    try {
      const result = await fetch(`${this.apiURL}/accounts/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.header,
        },
      });

      return { statusCode: result.status };
    } catch (e: any) {
      return e;
    }
  }

  /*
    Verify if the globoId belongs to express whitelist
  */
  async IsGloboIdInExpressWhiteList(): Promise<any> {
    if (!this.cartolaApiURL) {
      return Error('cartolaApiURL is empty');
    }

    if (!this.globoId) {
      return Error('globoId is empty');
    }

    if (!this.token) {
      return Error('token is empty');
    }

    try {
      const result = await fetch(`${this.cartolaApiURL}/auth/express`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.header.Authorization
        },
      });

      return await result.json();
    } catch (e: any) {
      return e;
    }
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