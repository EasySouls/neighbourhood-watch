import axios, { AxiosError } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import LocalStore from '../lib/store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

export const TOKEN_KEY = '__token__';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  // Load the token from storage on initialization
  useEffect(() => {
    const loadToken = async () => {
      const token = await LocalStore.getItemAsync(TOKEN_KEY);

      if (token) {
        setAuthState({ token, authenticated: true });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        setAuthState({ token: null, authenticated: false });
      }
    };

    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post('/auth/register', { email, password });
    } catch (e) {
      console.error('Error registering:', e);
      if (e instanceof AxiosError) {
        return { error: e.message, msg: e.response?.data.msg };
      }
      return { error: (e as any).message, msg: 'An error occurred' };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/auth/login', { email, password });

      setAuthState({ token: res.data.token, authenticated: true });

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.token}`;

      await LocalStore.setItemAsync(TOKEN_KEY, res.data.token);

      return res.data;
    } catch (e) {
      console.error('Error logging in:', e);
      if (e instanceof AxiosError) {
        return { error: e.message, msg: e.response?.data.msg };
      }
      return { error: (e as any).message, msg: 'An error occurred' };
    }
  };

  const logout = async () => {
    try {
      // Remove token from storage
      await LocalStore.setItemAsync(TOKEN_KEY, null);

      setAuthState({ token: null, authenticated: false });

      // Remove token from axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer null`;
    } catch (e) {
      console.error('Error logging in:', e);
      if (e instanceof AxiosError) {
        return { error: e.message, msg: e.response?.data.msg };
      }
      return { error: (e as any).message, msg: 'An error occurred' };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
