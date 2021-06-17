declare global {
  interface Window {
    glb: any;
  }
}

export const initNewGloboIdClient = async (clientId: string): Promise<any> => {
  await window.glb.globoIdClientMap.initNewGloboIdClient({
    clientId: clientId,
    resource: clientId,
    url: 'https://id.qa.globoi.com/auth',
    redirectUri: window.location.href.replace(/#.*$/, ''),
    sessionManagement: 'token',
  });
};

export const getGloboIdClient = (clientId: string): any => {
  const client = window.glb.globoIdClientMap.getGloboIdClient(clientId);
  client.stageQueueMap.applicationUsageStageQueue =
    client.stageQueueMap.applicationUsageStageQueue || [];

  return client;
};

export const isLogged = (clientId: string): Promise<boolean> => {
  const client = getGloboIdClient(clientId);

  const promise = new Promise<boolean>((resolve) => {
    client.stageQueueMap.applicationUsageStageQueue.push(
      async (GloboId: any) => {
        const isLogged = await GloboId.isLogged();
        resolve(isLogged);
      },
    );
  });

  return promise;
};

export const loginGloboID = (clientId: string) => {
  const client = getGloboIdClient(clientId);

  client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
    await GloboId.login();
  });
};

export const logoutGloboID = (clientId: string) => {
  const client = getGloboIdClient(clientId);

  client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
    await GloboId.logout();
  });
};

export const loadUserInfo = (clientId: string): string => {
  const client = getGloboIdClient(clientId);

  client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
    const userData = await GloboId.loadUserInfo();
    return userData;
  });

  return '';
};
