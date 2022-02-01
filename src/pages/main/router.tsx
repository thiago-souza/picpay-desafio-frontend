import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { OnboardingPage } from '@/pages/onboarding';
import { DocumentSelectionPage } from '@/pages/document-selection';
import { UploadInstructionsPage } from '@/pages/upload-instructions';
import { UploadBox } from '@/pages/upload';
import { StatusPage } from '@/pages/status';
import { usePageView } from '@/hooks';

interface IDocumentSelectionPage {
  selectedDoc: string;
  selectedDocCallback: (doc: string) => void;
}

const Routes: React.FC<IDocumentSelectionPage> = (
  props: IDocumentSelectionPage
) => {
  usePageView();

  return (
    <Switch>
      <Route path="/select">
        <DocumentSelectionPage
          selectedDoc={props.selectedDoc}
          selectedCallback={props.selectedDocCallback}
        />
      </Route>
      <Route path="/upload">
        <>
          <UploadInstructionsPage selectedDoc={props.selectedDoc} />
          <UploadBox selectedDoc={props.selectedDoc} />
        </>
      </Route>
      <Route path="/status/:type">
        <StatusPage />
      </Route>
      <Route path="/">
        <OnboardingPage />
      </Route>
    </Switch>
  )
}

const Router: React.FC<IDocumentSelectionPage> = (
  props: IDocumentSelectionPage,
) => {
  return (
    <BrowserRouter>
      <Routes
        selectedDoc={props.selectedDoc}
        selectedDocCallback={props.selectedDocCallback}
      />
    </BrowserRouter>
  );
};

export default Router;
