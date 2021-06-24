import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import Router from './router';
import { Header } from '@/components/header';
import { theme, GlobalStyle, ContainerBox } from './styles';
import { Main } from './styles/app.style';
import { AuthProvider } from '@/components/auth-context';

const App: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = React.useState('');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <AuthProvider>
          <Header />
          <ContainerBox>
            <Router
              selectedDoc={selectedDoc}
              selectedDocCallback={setSelectedDoc}
            />
          </ContainerBox>
        </AuthProvider>
      </Main>
    </ThemeProvider>
  );
};

export default App;
