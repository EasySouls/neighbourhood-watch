import { useEffect } from 'react';
import { router } from 'expo-router';

export default function IndexPage() {
  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   if (session) {
    //     router.replace('/(tabs)/');
    //   } else {
    //     router.replace('/(auth)/login');
    //   }
    // });
    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange((_event, session) => {
    //   if (session) {
    //     router.replace('/(tabs)/');
    //   } else {
    //     console.log('no session');
    //     router.replace('/(auth)/login');
    //   }
    // });
    // return () => subscription.unsubscribe();
  }, []);
}
