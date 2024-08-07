import { Stack } from 'expo-router';

export default function DutiesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='[id]' />
      <Stack.Screen name='create' />
    </Stack>
  );
}
