declare global {
  interface Window {
    glb: any;
  }
}

const client = window.glb; //.globoIdClientMap;

export const initNewGloboIdClient = (clientId: string): void => {
  if (client != null) {
    client.globoIdClientMap.initNewGloboIdClient({
      // need to be executed every time you refresh/load the page
      clientId: clientId,
      resource: clientId,
      url: 'https://id.qa.globoi.com/auth',
      redirectUri: window.location.href,
    });
  }
};

export const loginGloboID = (clientId:string) => {
  const client = window.glb.globoIdClientMap.getGloboIdClient(clientId);
  client.stageQueueMap.applicationUsageStageQueue =
    client.stageQueueMap.applicationUsageStageQueue || [];

  client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
    const isLogged = await GloboId.isLogged();
    console.log('isLogged:', isLogged);
  });

  client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
    await GloboId.login();
  });
};
