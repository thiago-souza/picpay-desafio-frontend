import * as React from 'react';
import { ContentContainer } from './content.style';
import { OnboardingPage } from '../../pages/onboarding';
import { DocumentSelectionPage } from '../../pages/document-selection';

export const Content: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedDoc, setSelectedDoc] = React.useState('');

  const goToPage = (step: number) => {
    setCurrentStep(step);
  };

  const setCurrentDoc = (doc: string) => {
    setSelectedDoc(doc);
  };

  const renderStepContent = () => {
    if (currentStep === 0) {
      return <OnboardingPage goToPageCallback={goToPage} />;
    }

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
      default:
        return <OnboardingPage goToPageCallback={goToPage} />;
    }
  };

  return <ContentContainer>{renderStepContent()}</ContentContainer>;
};
