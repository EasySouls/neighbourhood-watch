import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Profile } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const [profile, setProfile] = useState<Profile>();

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: insets.top }]}>
      <Image />
      <View>
        <Text>Full name: {profile?.full_name}</Text>
        <Text>Email: {profile?.email}</Text>
      </View>
      <Image />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
