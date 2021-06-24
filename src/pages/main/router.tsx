import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { OnboardingPage } from '@/pages/onboarding';
import { DocumentSelectionPage } from '@/pages/document-selection';
import { UploadInstructionsPage } from '@/pages/upload-instructions';
import { UploadBox } from '@/pages/upload';
import { StatusPage } from '@/pages/status';

interface IDocumentSelectionPage {
  selectedDoc: string;
  selectedDocCallback: (doc: string) => void;
}

const Router: React.FC<IDocumentSelectionPage> = (
  props: IDocumentSelectionPage,
) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/select">
          <DocumentSelectionPage
            selectedDoc={props.selectedDoc}
            selectedCallback={props.selectedDocCallback}
          />
        </Route>
        <Route path="/upload">
          <>
            <UploadInstructionsPage />
            <UploadBox selectedDoc={props.selectedDoc} />
          </>
        </Route>
        <Route path="/status">
          <StatusPage />
        </Route>
        <Route path="/">
          <OnboardingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
