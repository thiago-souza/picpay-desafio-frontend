class ApiService {
  apiURL: string;
  token: string;
  globoId: string;

  constructor(token: string, globoId: string) {
    this.apiURL = process.env.API_URL || '';
    this.token = token;
    this.globoId = globoId;
  }

  /*
    Get status on the user document
  */
  async getAttachments(): Promise<any> {
    if (this.apiURL != null && this.apiURL != '') {
      const promise = new Promise<any>((resolve, reject) => {
        if (!this.globoId) {
          return reject(new Error('globoId is empty'));
        }
        if (!this.token) {
          return reject(new Error('token is empty'));
        }

        fetch(`${this.apiURL}/accounts/attachments`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.token,
            'X-Globo-Id': this.globoId,
          },
        }).then((response) => {
          response.json().then((json) => {
            return resolve({ statusCode: response.status, data: json });
          });
        });
      });

      return promise;
    }
  }

  /*
    Upload attachment document
  */
  async upload(attach: string, type: string): Promise<any> {
    if (this.apiURL != null && this.apiURL != '') {
      const promise = new Promise<any>((resolve, reject) => {
        if (!this.globoId) {
          return reject(new Error('globoId is empty'));
        }
        if (!this.token) {
          return reject(new Error('token is empty'));
        }

        const req = {
          content: attach,
          type: type,
        };
        console.log('req: ', JSON.stringify);

        fetch(`${this.apiURL}/accounts/attachments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
            'X-Globo-Id': this.globoId,
          },
          body: JSON.stringify(req),
        })
          .then((response) => {
            response.json();
            return resolve(response.status);
          })
          .then((data) => console.log('data: ', data))
          .catch((error) => console.log('error: ', error));
      });

      return promise;
    }
  }

  /*
    Get Status on the user document
  */
  async getStatus(): Promise<any> {
    if (this.apiURL != null && this.apiURL != '') {
      const promise = new Promise<any>((resolve, reject) => {
        if (!this.globoId) {
          return reject(new Error('globoId is empty'));
        }
        if (!this.token) {
          return reject(new Error('token is empty'));
        }

        fetch(`${this.apiURL}/accounts/status`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.token,
            'X-Globo-Id': this.globoId,
          },
        }).then((response) => {
          response.json().then((json) => {
            return resolve({ statusCode: response.status, data: json });
          });
        });
      });

      return promise;
    }
  }

  /*
    Start KYC with IdWall process
  */
  async verify(): Promise<any> {
    if (this.apiURL != null && this.apiURL != '') {
      const promise = new Promise<any>((resolve, reject) => {
        if (!this.globoId) {
          return reject(new Error('globoId is empty'));
        }
        if (!this.token) {
          return reject(new Error('token is empty'));
        }

        fetch(`${this.apiURL}/accounts/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
            'X-Globo-Id': this.globoId,
          },
        })
          .then((response) => {
            response.json();
            return resolve(response.status);
          })
          .then((data) => console.log('data: ', data))
          .catch((error) => console.log('error: ', error));
      });

      return promise;
    }
  }
}

let instance: ApiService;

export function getApi(token: string, globoId: string): ApiService {
  if (!instance) {
    instance = new ApiService(token, globoId);
  }
  return instance;
}
export default getApi;
