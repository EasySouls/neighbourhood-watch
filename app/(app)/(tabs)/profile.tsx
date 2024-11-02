import { View, Text } from 'tamagui';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function ProfileScreen() {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
      }}
    >
      <Text fontSize={20}>Hello, {user.fullName}</Text>
    </View>
  );
}
