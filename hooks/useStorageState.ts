import React from 'react';
import { Platform } from 'react-native';
import LocalStore, { StoreKey } from '../lib/store';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export function useStorageState(key: StoreKey): UseStateHook<StoreKey> {
  const [state, setState] = useAsyncState<string>();

  React.useEffect(() => {
    LocalStore.getItemAsync(key).then((value) => {
      setState(value);
    });
  }, [key]);

  const setValue = React.useCallback(
    (value: StoreKey | null) => {
      setState(value);
      LocalStore.setItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
