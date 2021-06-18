import React, { createContext, useState } from 'react';
import GloboIdClient from '@/services/globoid/globoid-service';

interface IAuthContext {
  token: string;
}

export const AuthContext = createContext<IAuthContext | null>(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const clientId = 'cartola-kyc@apps.globoid';
  const [token, setToken] = useState('');

  React.useEffect(() => {
    const login = async () => {
      const client = new GloboIdClient(clientId);
      await client.init();
      const logged = await client.isLogged();
      if (!logged) {
        await client.loginGloboID();
      } else {
        const getToken = await client.getTokens();
        setToken(getToken.access_token);
      }
    };
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};
