import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { getCivilGuardComplete } from '../../../lib/civilGuards';
import { useAuth } from '../../../context/AuthContext';
import CivilGuardInfo from '../../../components/civilGuard/CivilGuardInfo';
import React from 'react';

export default function SettingsPage() {
  const { authState } = useAuth();
  const { isLoading, data, error } = useQuery({
    queryKey: ['account', authState?.civilGuard?.accountId],
    queryFn: () => getCivilGuardComplete(authState.civilGuard!.id),
  });

  // TODO- That's not how U use Suspense. Either move the data fetching inside the component or don't use Suspense at all

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <Suspense fallback={<Text>Loading...</Text>}>
          <CivilGuardInfo civilGuard={data!} />
        </Suspense>
      )}
    </View>
  );
}
