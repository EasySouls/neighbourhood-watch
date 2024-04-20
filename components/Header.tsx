import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Profile } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

async function getUserProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export default function Header() {
  const [profile, setProfile] = useState<Profile>();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        getUserProfile(user.id).then((profile) => {
          setProfile(profile);
        });
      } else {
        Alert.alert('You are not authenticated');
        router.replace('/(auth)/login');
      }
    });
  }, []);

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
