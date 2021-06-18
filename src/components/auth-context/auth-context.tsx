import React from 'react';
import GloboIdClient from '@/services/globoid/globoid-service';

export const AuthContext = React.createContext({
  globoId: '',
});

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const clientId = 'cartola-kyc@apps.globoid';
  const [glbId, setGlbId] = React.useState('');

  React.useEffect(() => {
    const login = async () => {
      const client = new GloboIdClient(clientId);
      await client.init();
      const logged = await client.isLogged();
      if (!logged) {
        await client.loginGloboID();
      } else {
        const userInfo = await client.loadUserInfo();
        setGlbId(userInfo.globo_id);
      }
    };
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ globoId: glbId }}>
      {children}
    </AuthContext.Provider>
  );
};
