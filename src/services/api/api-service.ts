class ApiService {
  apiURL: string;
  globoId: string;

  constructor(apiURL: string, globoId: string) {
    this.apiURL = apiURL;
    this.globoId = globoId;
  }

  /*
    Get status on the user document
  */
  async getAttachments(): Promise<any> {
    if (this.apiURL != null && this.apiURL != '') {
      const promise = new Promise<boolean>((resolve, reject) => {
        console.log('globoId: ', this.globoId);
        if (!this.globoId) {
          return reject(new Error('globoId is empty'));
        }

        fetch(`${this.apiURL}/accounts/attachments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            GloboId: this.globoId,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data: ', data);
            return resolve(data);
          });
      });

      return promise;
    }
  }

  /*
    Upload attachment document
  */
  async upload(attach: any): Promise<any> {
    if (this.apiURL != null && this.apiURL != '') {
      const promise = new Promise<boolean>((resolve, reject) => {
        console.log('globoId: ', this.globoId);
        if (!this.globoId) {
          return reject(new Error('globoId is empty'));
        }

        fetch(`${this.apiURL}/accounts/attachments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            GloboId: this.globoId,
          },
          body: JSON.stringify({ attach }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data: ', data);
            return resolve(data);
          });
      });

      return promise;
    }
  }

  /*
    Get Status on the user document
  */
  async getStatus(): Promise<any> {
    if (this.apiURL != null && this.apiURL != '') {
      const promise = new Promise<boolean>((resolve, reject) => {
        console.log('globoId: ', this.globoId);
        if (!this.globoId) {
          return reject(new Error('globoId is empty'));
        }

        fetch(`${this.apiURL}/accounts/status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            GloboId: this.globoId,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data: ', data);
            return resolve(data);
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
      const promise = new Promise<boolean>((resolve, reject) => {
        console.log('globoId: ', this.globoId);
        if (!this.globoId) {
          return reject(new Error('globoId is empty'));
        }

        fetch(`${this.apiURL}/accounts/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            GloboId: this.globoId,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data: ', data);
            return resolve(data);
          });
      });

      return promise;
    }
  }
}

export default ApiService;
