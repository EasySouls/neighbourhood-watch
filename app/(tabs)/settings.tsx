import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Alert, Text, View } from 'react-native';
import { router } from 'expo-router';

interface Profile {
  full_name: string;
  email: string;
}

async function getUserProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId);
  if (error) {
    throw error;
  }
  console.log(data);
  return data[0];
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>();

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

  if (!profile) {
    <Text>Could not load profile</Text>;
  }

  return (
    <View>
      <Text>Full name: {profile?.full_name}</Text>
      <Text>Email: {profile?.email}</Text>
    </View>
  );
}
