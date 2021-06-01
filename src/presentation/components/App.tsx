import * as React from 'react';
import { hot } from 'react-hot-loader';
import Title from './App.styled';

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <Title>Olá mundo!</Title>
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
