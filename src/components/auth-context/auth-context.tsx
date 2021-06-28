import React from 'react';
import GloboIdClient from '@/services/globoid/globoid-service';

interface IAuth {
  globoId: string;
  token: string;
  email: string;
}

export const AuthContext = React.createContext<IAuth>({
  globoId: '',
  token: '',
  email: '',
});

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [authData, setAuthData] = React.useState<IAuth>({});

  React.useEffect(() => {
    const login = async () => {
      const client = new GloboIdClient(process.env.OIDC_KEY || '');
      await client.init();
      const logged = await client.isLogged();
      if (!logged) {
        await client.loginGloboID();
      } else {
        const tokenResponse = await client.getTokens();

        const userInfo = await client.loadUserInfo();
        setAuthData({
          globoId: userInfo.globo_id,
          token: tokenResponse.access_token,
          email: userInfo.email,
        });
      }
    };
    login();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        globoId: authData.globoId,
        token: authData.token,
        email: authData.email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
