import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Content } from '@/components/content';
import { Header } from '@/components/header';
import { theme, GlobalStyle } from './styles';
import { Main } from './styles/app.style';
import {
  initNewGloboIdClient,
  loginGloboID,
  isLogged,
} from '@/services/globoid/globoid-service';

const App: React.FC = () => {
  const clientId = 'cartola-kyc@apps.globoid';

  React.useEffect(() => {
    const login = async () => {
      await initNewGloboIdClient(clientId);
      const logged = await isLogged(clientId);
      if (!logged) {
        loginGloboID(clientId);
      }
    }
    login();
  }, []);

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
