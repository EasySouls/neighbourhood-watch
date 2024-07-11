import { Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCivilGuardComplete } from '../../lib/civilGuards';
import { Suspense } from 'react';
import CivilGuardInfo from '../../components/civilGuard/CivilGuardInfo';

export default function SettingsPage() {
  const { authState } = useAuth();
  const { isLoading, data, error } = useQuery({
    queryKey: ['account', authState?.civilGuard?.accountId],
    queryFn: () => getCivilGuardComplete(authState?.civilGuard?.id!),
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
