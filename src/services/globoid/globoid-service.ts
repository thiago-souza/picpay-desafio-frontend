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
      redirectUri:
        'https://s.glbimg.qa.globoi.com/gl/ba/oidc/yourclient-globocom.callback.html',
    });
  }
};
