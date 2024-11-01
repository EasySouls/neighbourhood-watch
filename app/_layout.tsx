import '../tamagui-web.css';
import 'expo-dev-client';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

//import { useColorScheme } from '../components/useColorScheme';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import { AppStateStatus, Platform } from 'react-native';
import { useOnlineManager } from '../hooks/useOnlineManager';
import { useAppState } from '../hooks/useAppState';
import { initAxios, queryClient } from '../lib/queryClient';
import { AuthProvider } from '../context/AuthContext';
// import { TamaguiProvider } from 'tamagui';
import { TamaguiProvider } from '@tamagui/web';
import tamaguiConfig from '../tamagui.config';
import React from 'react';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useOnlineManager();

  useAppState(onAppStateChange);

  useReactQueryDevTools(queryClient);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    ...FontAwesome.font,
  });

  // Configure Axios for API requests for the backend.
  useEffect(() => {
    initAxios();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const colorScheme = useColorScheme();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // Keep this piece of code above the return statements, to avoid 'Rendered more hooks than during the previous render' error.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RootLayoutNav />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}
