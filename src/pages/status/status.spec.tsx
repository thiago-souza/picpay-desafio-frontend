import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom/extend-expect';

import { StatusPage } from './status';
import { theme } from '../main/styles';

const history = createMemoryHistory();

const renderStatusPage = (
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <Route path="/status/:type">
        <StatusPage />
      </Route>
    </ThemeProvider>
  </Router>
);

describe('Test status page render', () => {
  test('Should render in ERROR status page', () => {
    render(renderStatusPage);
    history.push('/status/error');
    expect(
      screen.getByText(/Ops! Isso não deveria ter acontecido/),
    ).toBeInTheDocument();
  });

  test('Should render in ACTIVE status page', () => {
    render(renderStatusPage);
    history.push('/status/active');

    expect(
      screen.getByText(/Opa! Precisamos de novas fotos/),
    ).toBeInTheDocument();
  });

  test('Should render in APPROVED status page', () => {
    render(renderStatusPage);
    history.push('/status/approved');
    expect(
      screen.getByText(/Pronto! Tudo certo com suas informações/),
    ).toBeInTheDocument();
  });

  test('Should render in PROCESS status page', () => {
    render(renderStatusPage);
    history.push('/status/in_process');
    expect(
      screen.getByText(/Enviado! Aguarde a verificação das suas informações/),
    ).toBeInTheDocument();
  });

  test('Should render in STILL PROCESS status page', () => {
    render(renderStatusPage);
    history.push('/status/still_in_process');
    expect(
      screen.getByText(
        /Aguarde um pouco mais! Em breve você poderá conferir se deu tudo certo/,
      ),
    ).toBeInTheDocument();
  });

  test('Should render in REJECTED status page', () => {
    render(renderStatusPage);
    history.push('/status/rejected');
    expect(
      screen.getByText(
        /A foto do documento enviado está ilegível. Precisamos que você faça o envio novamente/,
      ),
    ).toBeInTheDocument();
  });

  test('Should render in SUSPECTED status page', () => {
    render(renderStatusPage);
    history.push('/status/suspected');
    expect(
      screen.getByText(
        /Identificamos pendências em seu nome, e para jogar Cartola Express é preciso regularizar sua situação/,
      ),
    ).toBeInTheDocument();
  });

  test('Should render in PENDING status page', () => {
    render(renderStatusPage);
    history.push('/status/is_pending');
    expect(
      screen.getByText(/Por favor, entre em contato com o nosso antendimento/),
    ).toBeInTheDocument();
  });
});
