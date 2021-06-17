import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Content } from '@/components/content';
import { Header } from '@/components/header';
import { theme, GlobalStyle } from './styles';
import { Main } from './styles/app.style';
import {
  initNewGloboIdClient,
  loginGloboID,
} from '@/services/globoid/globoid-service';

const App: React.FC = () => {
  const clientId = 'cartola-kyc@apps.globoid';

  initNewGloboIdClient(clientId);
  loginGloboID(clientId);

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
