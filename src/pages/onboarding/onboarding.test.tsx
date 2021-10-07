import React from 'react';
import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom/extend-expect';

import { theme } from '../main/styles';
import { OnboardingPage } from '@/pages/onboarding';

const history = createMemoryHistory();

const renderOnboardingPage = (
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <Route path="/">
        <OnboardingPage />
      </Route>
    </ThemeProvider>
  </Router>
);

describe('Test onboarding page', () => {

  
  beforeAll(() => {
    window.dataLayer = []
    window.ga = jest.fn()
    process.env = Object.assign(process.env, {
      EXPRESS_DF: 'https://cartolaexpress.df.globo.com/contests',
    });
  })

  test('Should render onboarding page and proceed to the next step', () => {
    // get containing DOM node 
    const { container } = render(renderOnboardingPage);

    // check if a page was rendered with some desired content
    expect(container).toHaveTextContent('Para continuar, precisamos que você faça a verificação da sua identidade.')

    // get contentSideBar and btnVerifyIdentity in container
    const contentSideBar = getByTestId(container, 'content-side-bar')
    const btnVerifyIdentity = getByTestId(contentSideBar, 'btn-custom')

    // trigger on click of verify identify and to next step
    fireEvent.click(btnVerifyIdentity)

    // Check if the user clicks and went to the next step (/select)
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/select');
  })
  
  test('Should open confirmation modal when user clicks the button "Deixar para depois" and close modal to end', () => {
    // get containing DOM node 
    const { container } = render(renderOnboardingPage);

    // get contentSideBar and btnSeeLater in container
    const contentSideBar = getByTestId(container, 'content-side-bar')
    const btnSeeLater = getByTestId(contentSideBar, 'btn-custom-link')

    // trigger on click of see later 
    fireEvent.click(btnSeeLater)

    // get modalConfirm in container and btnSeeLaterModal in modalConfirm
    const modalConfirm = getByTestId(container, 'modal-confirm-single')
    const btnSeeLaterModal = getByTestId(modalConfirm, 'btn-custom-link')

    // checks if the modal is being applied and its content
    expect(modalConfirm).toHaveClass("show");
    expect(modalConfirm).toHaveTextContent('Quer mesmo verificar sua identidade depois?')
    
    // trigger on click of see later and close modal to end
    fireEvent.click(btnSeeLaterModal)

    // checks if the modal is closed
    expect(modalConfirm).toHaveClass("hide");
  });
  
  test('Should redirect URL correct when user clicks "Deixar para depois" in modal', async () => {
    // get containing DOM node 
    const { container } = render(renderOnboardingPage);

    // get modalConfirm in container and btnSeeLaterModal in modalConfirm
    const modalConfirm = getByTestId(container, 'modal-confirm-single')
    const linkSeeLaterModal = await waitFor(() => getByTestId(modalConfirm, 'btn-link-url'))

    // check if the URL is correct
    expect(linkSeeLaterModal).toHaveAttribute('href', "https://cartolaexpress.df.globo.com/contests");
  });  
});
