import React from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from '@/components/auth-context';
import { sendGAPageView } from '@/services/tracking';

export const usePageView = (): void => {
  const location = useLocation();
  const authData = React.useContext(AuthContext);

  const handleStatus = (status: string) => {
    switch (status) {
      case 'approved':
        return '#!/kyc/status-aprovado';
      case 'in_process':
      case 'still_in_process':
        return '#!/kyc/status-em-andamento';
      case 'rejected':
        return '#!/kyc/status-rejeitado';
      case 'suspected':
        return '#!/kyc/status-suspenso';
      case 'error':
        return '#!/kyc/status-erro-generico';
      default:
        return '#!/kyc/status-erro-generico';
    }
  }

  const getPageView = (path: string) => {
    if (path.includes('/status')) {
      const status = path.split('/').pop();
      return handleStatus(status || '');
    }

    switch (path) {
      case '/':
        return '#!/kyc/verificar-identidade';
      case '/select':
        return '#!/kyc/selecao-documento';
      case '/upload':
        return '#!/kyc/enviar-documento';
      default:
        return '#!/kyc/verificar-identidade';
    }
  }

  React.useEffect(() => {
    if (authData.globoId) {
      sendGAPageView(authData.globoId, getPageView(location.pathname));
    }

  }, [location, authData]);
}