import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import { Content } from '../../components/content';
import { Header } from '../../components/header';
import { theme, GlobalStyle } from './styles';
import { Main } from './styles/app.style';

const App: React.FC = () => {
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

export default hot(module)(App);
