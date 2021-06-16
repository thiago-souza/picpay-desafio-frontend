import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Content } from '@/components/content';
import { Header } from '@/components/header';
import { theme, GlobalStyle } from './styles';
import { Main } from './styles/app.style';
//import { initNewGloboIdClient } from '@/services/globoid/globoid-service';

const App: React.FC = () => {
  debugger;
  //initNewGloboIdClient('clientid');
  // const client = window.glb.globoIdClientMap.getGloboIdClient('clientid');
  // client.stageQueueMap.applicationUsageStageQueue =
  //   client.stageQueueMap.applicationUsageStageQueue || [];

  // client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
  //   const isLogged = await GloboId.isLogged();
  //   console.log('isLogged:', isLogged);
  // });

  //client.stageQueueMap.applicationUsageStageQueue.push(async (GloboId: any) => {
  //  await GloboId.login();
  //});

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <Header />
        <Content />
      </Main>
    </ThemeProvider>
  );
};

export default App;
