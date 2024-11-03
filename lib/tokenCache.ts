import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Interface for secure token management operations
 */
export interface TokenCache {
  /** Retrieves a token stored under the specified key */
  getToken: (key: string) => Promise<string | undefined | null>;
  /** Stores a token value under the specified key */
  saveToken: (key: string, value: string) => Promise<void>;
  /** Optional method to remove a token stored under the specified key */
  clearToken?: (key: string) => Promise<void>;
}

const createTokenCache = (): TokenCache => {
  return {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log('No values stored under key: ' + key);
        }
        return item;
      } catch (error) {
        console.error('SecureStore get item error: ', error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      return SecureStore.setItemAsync(key, value);
    },
    async clearToken(key: string) {
      return SecureStore.deleteItemAsync(key);
    },
  };
};

const createWebTokenCache = (): TokenCache => ({
  async getToken(key: string) {
    return localStorage.getItem(key);
  },
  async saveToken(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  async clearToken(key: string) {
    localStorage.removeItem(key);
  },
});

export const tokenCache =
  Platform.OS === 'web' ? createWebTokenCache() : createTokenCache();
