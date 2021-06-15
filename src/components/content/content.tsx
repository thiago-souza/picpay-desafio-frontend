import * as React from 'react';
import { ContainerBox } from './content.style';
import { OnboardingPage } from '@/pages/onboarding';
import { DocumentSelectionPage } from '@/pages/document-selection';
import { UploadInstructionsPage } from '@/pages/upload-instructions';
import { StatusPage } from '@/pages/status';
import { UploadBox } from '@/pages/upload';

export const Content: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedDoc, setSelectedDoc] = React.useState('');
  console.log('🚀 ~ file: content.tsx ~ line 10 ~ selectedDoc', selectedDoc);

  const goToPage = (step: number) => {
    setCurrentStep(step);
  };

  const setCurrentDoc = (doc: string) => {
    setSelectedDoc(doc);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <OnboardingPage goToPageCallback={goToPage} />;
      case 1:
        return (
          <DocumentSelectionPage
            goToPageCallback={goToPage}
            selectedCallback={setCurrentDoc}
          />
        );
      case 2:
        return (
          <>
            <UploadInstructionsPage />
            <UploadBox goToPageCallback={goToPage} />
          </>
        );
      case 3:
        return <StatusPage goToPageCallback={goToPage} />;
      default:
        return <OnboardingPage goToPageCallback={goToPage} />;
    }
  };

  return <ContainerBox>{renderStepContent()}</ContainerBox>;
};
