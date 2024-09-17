import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='login'
        options={{ 
          headerShown: true, 
          title: 'Neighbourhood Watch',
          headerStyle: {
            backgroundColor: '#d49f00',
          },
          headerTitleStyle: {
            color: '#000',
            fontWeight: 'bold', 
          }
        }}
      />
      <Stack.Screen
        name='signup'
        options={{ 
          headerShown: true,
          title: 'Neighbourhood Watch',
          headerStyle: {
            backgroundColor: '#d49f00',
          },
          headerTitleStyle: {
            color: '#000',
            fontWeight: 'bold',
          }
         }} 
      />
    </Stack>
  );
}
