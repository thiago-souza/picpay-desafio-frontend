declare global {
  interface Window {
    glb: any;
  }
}

export const initNewGloboIdClient = (clientId: string): void => {
  window.glb.globoIdClientMap.initNewGloboIdClient({
    clientId: clientId,
    resource: clientId,
    url: 'https://id.qa.globoi.com/auth',
    redirectUri: window.location.href,
    sessionManagement: 'token',
    onLoad: 'check-sso',
  });
};

export const getGloboIdClient = (clientId: string): any => {
  debugger;
  const client = window.glb.globoIdClientMap.getGloboIdClient(clientId);
  client.stageQueueMap.applicationUsageStageQueue =
    client.stageQueueMap.applicationUsageStageQueue || [];

  return client;
};

export const isLogged = (clientId: string): boolean => {
  const client = getGloboIdClient(clientId);

  client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
    const isLogged = await GloboId.isLogged();
    return isLogged;
  });

  return false;
};

export const loginGloboID = (clientId: string) => {
  debugger;
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
