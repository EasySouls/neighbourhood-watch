import '../tamagui-web.css';
import 'expo-dev-client';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Slot, useNavigationContainerRef, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '../components/useColorScheme';
import { LogBox } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import { AppStateStatus, Platform } from 'react-native';
import { useOnlineManager } from '../hooks/useOnlineManager';
import { useAppState } from '../hooks/useAppState';
import { initAxios, queryClient } from '../lib/queryClient';
import { AuthProvider } from '../context/AuthContext';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import React from 'react';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { ConvexReactClient, useConvexAuth } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { tokenCache } from '@/tokenCache';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

export {
  //Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  );
}

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error(
    'Missing Convex URL. Please set EXPO_PUBLIC_CONVEX_URL in your .env',
  );
}

const convexClient = new ConvexReactClient(convexUrl, {
  unsavedChangesWarning: false,
});

LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

// const routingInstrumentation = new Sentry.ReactNativeNavigationInstrumentation({
//   enableTimeToInitialDisplay:
//     Constants.executionEnvironment === ExecutionEnvironment.StoreClient, // Only in native builds, not in Expo Go,
// });
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
  enableTimeToInitialDisplay:
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient, // Only in native builds, not in Expo Go,
});

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  attachScreenshot: true,
  tracesSampleRate: 1.0,
  debug: false,
  // _experiments: {
  //   profilesSampleRate: 1.0,
  //   replaysSessionSampleRate: 1.0,
  //   replaysOnErrorSampleRate: 1.0,
  // },
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableNativeFramesTracking:
        Constants.executionEnvironment === ExecutionEnvironment.StoreClient, // Only in native builds, not in Expo Go,
    }),
    // Sentry.mobileReplayIntegration(),
  ],
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const router = useRouter();
  const user = useUser();

  useOnlineManager();

  useAppState(onAppStateChange);

  useReactQueryDevTools(queryClient);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    ...FontAwesome.font,
  });

  // Configure Axios for API requests for the backend.
  useEffect(() => {
    initAxios();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (isLoading) return;

    // const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    } else {
      router.replace('/(app)/(tabs)');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (user && user.user) {
      Sentry.setUser({
        email: user.user.emailAddresses[0].emailAddress,
        id: user.user.id,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [user]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}

function RootLayout() {
  const colorScheme = useColorScheme();

  // Capture the NavigationContainer ref and register it with the instrumentation.
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
          <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
            <ThemeProvider
              value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
              <QueryClientProvider client={queryClient}>
                <AuthProvider>
                  <RootLayoutNav />
                </AuthProvider>
              </QueryClientProvider>
            </ThemeProvider>
          </TamaguiProvider>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default Sentry.wrap(RootLayout);
