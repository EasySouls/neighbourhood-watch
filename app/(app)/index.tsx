import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import ActiveCurrentPatrol from '../../components/duties/ActiveCurrentPatrol';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getActiveDuties,
  getOwnActiveDuty,
  stopActiveDuty,
} from '../../lib/duties';
import ActiveDuties from '../../components/duties/ActiveDuties';
import { Button } from 'tamagui';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { authState } = useAuth();
  const router = useRouter();

  const id = authState?.civilGuard?.id!;
  const departmentId = authState?.civilGuard?.departmentId!;

  const activeDuties = useQuery({
    queryKey: ['duties', 'active'],
    queryFn: () => getActiveDuties(departmentId),
  });

  const ownActiveDuty = useQuery({
    queryKey: ['duties', 'active'],
    queryFn: () => getOwnActiveDuty(id, departmentId),
  });

  const stopActiveDutyMutation = useMutation({
    mutationKey: ['duties', 'active'],
    mutationFn: (dutyId: string) => stopActiveDuty(dutyId),
  });

  return (
    <View style={styles.container}>
      {ownActiveDuty.data ? (
        <ActiveCurrentPatrol
          duty={ownActiveDuty.data}
          onEnd={() => {
            stopActiveDutyMutation.mutate(ownActiveDuty.data!.id);
          }}
        />
      ) : (
        <Text>You are not on duty</Text>
      )}
      <Button
        theme='blue'
        onPress={() => {
          router.push('/duties/create');
        }}
      >
        Új szolgálat
      </Button>
      {activeDuties.data ? (
        <ActiveDuties duties={activeDuties.data} />
      ) : (
        <Text>Nincsenek aktív szolgálatok</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
