import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const AuthenticatedLayout = () => {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href='/(auth)/login' />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='duties' />
    </Stack>
  );
};

export default AuthenticatedLayout;
