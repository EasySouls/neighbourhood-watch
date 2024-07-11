import axios, { AxiosError } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import LocalStore from '../lib/store';
import { CivilGuard, CodeConfirmResponse, SignUpResponse } from '../types';
import { usePathname, useRouter } from 'expo-router';

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    civilGuard: CivilGuard | null;
  };
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
  const router = useRouter();
  const pathname = usePathname();

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    civilGuard: CivilGuard | null;
  }>({
    token: null,
    authenticated: null,
    civilGuard: null,
  });

  // Load the token from storage on initialization
  useEffect(() => {
    const loadToken = async () => {
      const token = await LocalStore.getItemAsync(TOKEN_KEY);

      if (token) {
        // Set the token in axios headers so that it is sent with every request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Retrieve the current user based on the token
        const { data: civilGuard } = await axios.get<CivilGuard>(
          'auth/profile'
        );
        setAuthState({ token, authenticated: true, civilGuard });

        // Redirect to the app if the user is already authenticated
        router.replace('/(app)/');
      } else {
        setAuthState({ token: null, authenticated: false, civilGuard: null });
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

      const token = res.data.access_token;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await LocalStore.setItemAsync(TOKEN_KEY, token);
      console.log('Token:', token);

      const { data: civilGuard } = await axios.get<CivilGuard>('auth/profile');

      setAuthState({
        token: res.data.access_token,
        authenticated: true,
        civilGuard,
      });

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

      setAuthState({ token: null, authenticated: false, civilGuard: null });

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
