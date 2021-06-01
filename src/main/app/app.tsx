import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import Title from './app.styled';
import { theme } from '../../presentation/styles/theme';

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          <Title>Olá mundo!</Title>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
