class ApiService {
  apiURL: string;
  token: string;
  globoId: string;

  constructor(apiURL: string, token: string, globoId: string) {
    this.apiURL = apiURL;
    this.token = token;
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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
            'X-Globo-Id': this.globoId,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data: ', data);
            return resolve(data);
          });
      });

      /*
        RESPOSTA:
        {
          'type': 'CNH/RG/RNE',
          'content': '123',
          'status': 'ACTIVE/INACTIVE/APPROVED/REJECTED'
        }
      */
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

        const url =
          'https://cors-anywhere.herokuapp.com/' +
          this.apiURL +
          '/accounts/attachments';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
            'X-Globo-Id': this.globoId,
          },
          body: JSON.stringify({ attach }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data: ', data);
            return resolve(data);
          });
      });

      /*
        {
          'body': {},
          'statusCode': 'ACCEPTED',
          'statusCodeValue': 0,
        }
      */
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

        console.log('token: ', this.token);
        const url = this.apiURL + '/accounts/status';

        fetch(url, {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
            'X-Globo-Id': this.globoId,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            debugger;
            console.log('data: ', data);
            return resolve(data);
          });
      });

      /*
        RESPOSTA:
        {
          'status': 'CREATED/IN PROCESS/APPROVED/REJECTED/SUSPECTED/CANCELED'
        }
      */
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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
            'X-Globo-Id': this.globoId,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data: ', data);
            return resolve(data);
          });
      });

      /*
        201 - Created
      */
      return promise;
    }
  }
}

export default ApiService;
