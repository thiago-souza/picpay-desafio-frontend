import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Content } from '@/components/content';
import { Header } from '@/components/header';
import { theme, GlobalStyle } from './styles';
import { Main } from './styles/app.style';
import { AuthProvider } from '@/components/auth-context';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <AuthProvider>
          <Header />
          <Content />
        </AuthProvider>
      </Main>
    </ThemeProvider>
  );
};

export default App;
