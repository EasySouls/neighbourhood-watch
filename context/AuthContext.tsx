import axios, { AxiosError } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import LocalStore from '../lib/store';
import { CodeConfirmResponse, SignUpResponse } from '../types';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onCodeConfirmSent?: (
    email: string,
    code: number
  ) => Promise<CodeConfirmResponse>;
  onSignUp?: (
    email: string,
    password: string,
    authCode: number
  ) => Promise<SignUpResponse>;
  onLogin?: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
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

  const sendCodeConfirm = async (
    email: string,
    code: number
  ): Promise<CodeConfirmResponse> => {
    try {
      const res = await axios.post('/auth/validateCode', { email, code });
      return res.data;
    } catch (e) {
      console.error('Error sending code confirmation:', e);
      if (e instanceof AxiosError) {
        return { isValid: false, name: null };
      }
      return { isValid: false, name: null };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    authCode: number
  ): Promise<SignUpResponse> => {
    try {
      const res = await axios.post('/auth/signup', {
        email,
        password,
        authCode,
      });
      return { error: null, account: res.data };
    } catch (e) {
      console.error('Error registering:', e);
      if (e instanceof AxiosError) {
        return { error: e.message, account: null };
      }
      return { error: (e as any).message, account: null };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    try {
      const res = await axios.post<{ access_token: string }>('/auth/login', {
        email,
        password,
      });

      setAuthState({ token: res.data.access_token, authenticated: true });

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.access_token}`;

      console.log('Token:', res.data.access_token);

      await LocalStore.setItemAsync(TOKEN_KEY, res.data.access_token);

      return { error: null };
    } catch (e) {
      console.error('Error logging in:', e);
      if (e instanceof AxiosError) {
        return { error: e.message };
      }
      return { error: 'An error occurred' };
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
    onSignUp: signUp,
    onCodeConfirmSent: sendCodeConfirm,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
