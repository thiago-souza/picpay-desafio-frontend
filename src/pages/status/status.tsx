import * as React from 'react';

import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '@/components/auth-context';
import {
  renderApproved,
  renderError,
  renderInProcess,
  renderIsPending,
  renderRejected,
  renderStillInProcess,
  renderSuspected,
} from './components';
import { ContentItems } from '@/pages/main/styles/content.style';
import { ModalConfirm } from '@/components/modal-confirm';
import { sendEvent } from '@/services/tracking';

export const StatusPage: React.FC = () => {
  const authData = React.useContext(AuthContext);
  const history = useHistory();
  const { email: userEmail } = authData;

  const [statusState, setStatusState] = React.useState({
    isModalShow: false,
  });

  const { type } = useParams<{ type: string }>();

  const handleClickSeeLater = () => {
    sendEvent(
      'know-your-customer',
      'Reiniciar | Rejeitado',
      'Depois'
    );

    setStatusState({ ...statusState, isModalShow: !statusState.isModalShow });
  };

  const handleClickRejectedRestart = () => {
    sendEvent(
      'know-your-customer',
      'Reiniciar o Processo | Rejeitado',
      'Reiniciar'
    );
  
    history.push('/select');
  }

  const getStatusType = type ? type.toLowerCase() : '';

  const renderTypeStatus = () => {
    switch (getStatusType) {
      case 'in_process':
        return renderInProcess(userEmail);
      case 'still_in_process':
        return renderStillInProcess(userEmail);
      case 'active':
        return renderRejected(handleClickSeeLater, handleClickRejectedRestart);
      case 'approved':
        return renderApproved;
      case 'suspected':
        return renderSuspected;
      case 'rejected':
        return renderRejected(handleClickSeeLater, handleClickRejectedRestart);
      case 'is_pending':
        return renderIsPending;
      case 'error':
        return renderError;
      default:
        return renderError;
    }
  };

  return (
    <>
      <ModalConfirm
        isShown={statusState.isModalShow}
        callbackHide={handleClickSeeLater}
      />
      <ContentItems>{renderTypeStatus()}</ContentItems>
    </>
  );
};
