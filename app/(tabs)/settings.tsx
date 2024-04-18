import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Alert, Text, View } from 'react-native';

interface Profile {
  full_name: string;
  email: string;
}

async function getUserProfile(userId: string): Promise<Profile> {
  // return {
  //   full_name: 'John Doe',
  //   email: 'johndoe@gmail.com',
  // } satisfies Profile;
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
        //router.replace('/(auth)/login');
        Alert.alert('You are not authenticated');
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
