import React from 'react';
import GloboIdClient from '@/services/globoid/globoid-service';

export const AuthContext = React.createContext({
  globoId: '',
  token: '',
  email: '',
});

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [glbId, setGlbId] = React.useState('');
  const [token, setToken] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const login = async () => {
      const client = new GloboIdClient(process.env.OIDC_KEY || '');
      await client.init();
      const logged = await client.isLogged();
      if (!logged) {
        await client.loginGloboID();
      } else {
        const tokenResponse = await client.getTokens();
        setToken(tokenResponse.access_token);

        const userInfo = await client.loadUserInfo();
        setGlbId(userInfo.globo_id);
        setEmail(userInfo.email);
      }
    };
    login();
  }, []);

  return (
    <AuthContext.Provider
      value={{ globoId: glbId, token: token, email: email }}
    >
      {children}
    </AuthContext.Provider>
  );
};
