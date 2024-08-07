import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from '../context/AuthContext';

export const AUTH_STATE_KEY = 'auth_state_key';
export const USER_KEY = 'user_key';

export type StoreKey =
  | typeof AUTH_STATE_KEY
  | typeof USER_KEY
  | typeof TOKEN_KEY;

type Store = {
  getItemAsync: (key: StoreKey) => Promise<string | null>;
  setItemAsync: (key: StoreKey, value: string | null) => Promise<void>;
};

const LocalStore: Store = {
  getItemAsync: async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }

    return await SecureStore.getItemAsync(key);
  },
  setItemAsync: async (key, value) => {
    if (Platform.OS === 'web') {
      try {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      } catch (error) {
        console.error('Error setting local storage:', error);
      }
    } else {
      if (value === null) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    }
  },
};

export default LocalStore;
