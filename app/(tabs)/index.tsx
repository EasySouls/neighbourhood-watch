import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import ActiveCurrentPatrol from '../../components/duties/ActiveCurrentPatrol';
import { Duty, DutyType } from '../../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getActiveDuties,
  getOwnActiveDuty,
  stopActiveDuty,
} from '../../lib/duties';
import ActiveDuties from '../../components/duties/ActiveDuties';

export default function HomeScreen() {
  const departmentId = '5f519f92-1468-4bbb-8e7f-df34e3ce527b';
  const userId = '5f519f92-1468-4bbb-8e7f-df34e3ce527b';

  const activeDuties = useQuery({
    queryKey: ['duties', 'active'],
    queryFn: () => getActiveDuties(departmentId),
  });

  const ownActiveDuty = useQuery({
    queryKey: ['duties', 'active'],
    queryFn: () => getOwnActiveDuty(userId, departmentId),
  });

  const stopActiveDutyMutation = useMutation({
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
      {activeDuties.data ? (
        <ActiveDuties duties={activeDuties.data} />
      ) : (
        <Text>There are no active duties</Text>
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
