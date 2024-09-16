import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import {
  fetchActiveDuties,
  fetchOwnActiveDuty,
  stopActiveDuty,
} from '../../../lib/duties';
import ActiveCurrentPatrol from '../../../components/duties/ActiveCurrentPatrol';
import ActiveDuties from '../../../components/duties/ActiveDuties';
import React from 'react';

export default function HomeScreen() {
  const { authState } = useAuth();
  const router = useRouter();

  const id = authState.civilGuard!.id;
  const departmentId = authState.civilGuard!.departmentId;

  const activeDuties = useQuery({
    queryKey: ['duties', 'active'],
    queryFn: () => fetchActiveDuties(departmentId),
  });

  const ownActiveDuty = useQuery({
    queryKey: ['duties', 'active', id],
    queryFn: () => fetchOwnActiveDuty(),
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
        theme="blue"
        onPress={() => {
          router.push('/duties');
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
