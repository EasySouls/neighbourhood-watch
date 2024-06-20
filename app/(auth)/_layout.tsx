import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='login'
        options={{ headerShown: true, title: 'Neighbourhood Watch' }}
      />
      <Stack.Screen
        name='signup'
        options={{ headerShown: true, title: 'Neighbourhood Watch' }}
      />

      <StatusBar style='auto' backgroundColor='#161622' />
    </Stack>
  );
}
