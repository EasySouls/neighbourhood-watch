import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';
import { Alert } from 'react-native';

interface Profile {
  full_name: string;
  email: string;
}

async function getUserProfile(userId: string): Promise<Profile> {
  return {
    full_name: 'John Doe',
    email: 'johndoe@gmail.com',
  } satisfies Profile;
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
}
