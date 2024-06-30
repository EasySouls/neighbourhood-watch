import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const AUTH_STATE_KEY = 'auth_state_key';
export const USER_KEY = 'user_key';

type StoreKey = typeof AUTH_STATE_KEY | typeof USER_KEY;

type Store = {
  getItem: (key: StoreKey) => Promise<string | null>;
  setItem: (key: StoreKey, value: string) => Promise<void>;
};

const LocalStore: Store = {
  getItem: async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }

    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key, value) => {
    if (Platform.OS === 'web') {
      return localStorage.setItem(key, value);
    }

    return await SecureStore.setItemAsync(key, value);
  },
};

export default LocalStore;
