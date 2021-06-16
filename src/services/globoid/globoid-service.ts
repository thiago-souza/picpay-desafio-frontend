declare global {
  interface Window {
    glb: any;
  }
}

const getGloboIdClient = (clientId: string): any => {
  const client = window.glb.globoIdClientMap.getGloboIdClient(clientId);
  client.stageQueueMap.applicationUsageStageQueue =
    client.stageQueueMap.applicationUsageStageQueue || [];

  return client;
};

export const initNewGloboIdClient = (clientId: string): void => {
  const client = getGloboIdClient(clientId);

  client.initNewGloboIdClient({
    clientId: clientId,
    resource: clientId,
    url: 'https://id.qa.globoi.com/auth',
    redirectUri: window.location.href,
  });
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
  const client = getGloboIdClient(clientId);

  client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
    await GloboId.login();
  });
};
