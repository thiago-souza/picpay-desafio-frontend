declare global {
  interface Window {
    dataLayer: any;
    ga: any;
  }
}

const sendGTMEvent = (
  eventCategory: string,
  eventAction: string,
  eventLabel: string,
): void => {
  if (window.dataLayer && eventCategory.length) {
    window.dataLayer.push({
      event: 'eventTracking',
      eventCategory: eventCategory,
      eventAction: eventAction,
      eventLabel: eventLabel,
    });
    console.log(
      'v2 - GTM - dataLayer sendEvent: eventCategory, eventAction, eventLabel --> ',
      eventCategory,
      eventAction,
      eventLabel,
    );
  } else {
    console.error('* GTM datalayer não definido.');
  }
};

const sendGAPageView = (globoId: string, pathname?: string): void => {
  if (!globoId) {
    console.warn('Usuário sem globoId!');
    return;
  }

  if (!window.ga) {
    console.warn('Não existe window.ga!');
    return;
  }

  window.ga('set', 'dimension96', 'globoId');
  window.ga('set', 'dimension99', globoId);
  window.ga('set', 'dimension1', 'web');
  window.ga('send', 'pageview', pathname || window.location.pathname);
  console.log('v2 - GTM - pageview --> ', pathname || window.location.pathname);
};

export { sendGTMEvent, sendGAPageView };
