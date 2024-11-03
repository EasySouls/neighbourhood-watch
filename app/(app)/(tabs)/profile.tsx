import { View, Text, Image } from 'tamagui';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function ProfileScreen() {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn) {
    return null;
  }

  return (
    <View gap="$4">
      <Text fontSize={20}>
        Hello, {user.fullName || user.firstName || 'there'}
      </Text>
      <Text fontSize={16}>Email: {user.primaryEmailAddress?.emailAddress}</Text>
      {user.imageUrl && (
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )}
    </View>
  );
}
