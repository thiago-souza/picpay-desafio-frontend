declare global {
  interface Window {
    glb: any;
    clarity: any;
  }
}

class GloboIdClient {
  clientId: string;
  clientHasInit: boolean;

  constructor(clientId: string) {
    this.clientId = clientId;
    this.clientHasInit = false;
  }

  async init(): Promise<any> {
    if (!this.clientHasInit) {
      await window.glb.globoIdClientMap.initNewGloboIdClient({
        clientId: this.clientId,
        resource: this.clientId,
        url: process.env.GLOBO_ID_AUTH,
        realm: process.env.REALM,
        redirectUri: window.location.href.replace(/#.*$/, ''),
        sessionManagement: 'token',
      });
      this.clientHasInit = true;
    }
  }

  getGloboIdClient() {
    const client = window.glb.globoIdClientMap.getGloboIdClient(this.clientId);
    client.stageQueueMap.applicationUsageStageQueue =
      client.stageQueueMap.applicationUsageStageQueue || [];

    return client;
  }

  isLogged(): Promise<boolean> {
    const client = this.getGloboIdClient();

    const promise = new Promise<boolean>((resolve, reject) => {
      if (!client) {
        reject(new Error('GloboID Client Error'));
      }
      client.stageQueueMap.applicationUsageStageQueue.push(
        async (GloboId: any) => {
          const isLogged = await GloboId.isLogged();
          resolve(isLogged);
        },
      );
    });

    return promise;
  }

  loginGloboID(): Promise<boolean> {
    const client = this.getGloboIdClient();

    const promise = new Promise<boolean>((resolve, reject) => {
      if (!client) {
        return reject(new Error('GloboID Client Error'));
      }
      client.stageQueueMap.applicationUsageStageQueue.push(
        async (GloboId: any) => {
          await GloboId.login();
          return resolve(true);
        },
      );
    });

    return promise;
  }

  logoutGloboID(): Promise<boolean> {
    const client = this.getGloboIdClient();

    const promise = new Promise<boolean>((resolve, reject) => {
      if (!client) {
        return reject(new Error('GloboID Client Error'));
      }
      client.stageQueueMap.applicationUsageStageQueue.push(
        async (GloboId: any) => {
          await GloboId.logout();
          return resolve(true);
        },
      );
    });

    return promise;
  }

  loadUserInfo(): Promise<any> {
    const client = this.getGloboIdClient();

    const promise = new Promise<boolean>((resolve, reject) => {
      if (!client) {
        return reject(new Error('GloboID Client Error'));
      }
      client.stageQueueMap.applicationUsageStageQueue.push(
        async (GloboId: any) => {
          const userData = await GloboId.loadUserInfo();
          return resolve(userData);
        },
      );
    });

    return promise;
  }

  getTokens(): Promise<any> {
    const client = this.getGloboIdClient();

    const promise = new Promise<boolean>((resolve, reject) => {
      if (!client) {
        return reject(new Error('GloboID Client Error'));
      }
      client.stageQueueMap.applicationUsageStageQueue.push(
        async (GloboId: any) => {
          const userData = await GloboId.getTokens();
          return resolve(userData);
        },
      );
    });

    return promise;
  }
}

export default GloboIdClient;
