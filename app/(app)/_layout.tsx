import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { Authenticated, useConvexAuth } from 'convex/react';

const AuthenticatedLayout = () => {
  const { isAuthenticated } = useConvexAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Authenticated>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="duties" />
      </Stack>
    </Authenticated>
  );
};

export default AuthenticatedLayout;
