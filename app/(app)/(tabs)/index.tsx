import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';
import ActiveCurrentPatrol from '../../../components/duties/ActiveCurrentPatrol';
import ActiveDuties from '../../../components/duties/ActiveDuties';
import React from 'react';
import { DutyType } from '@/index';

export default function HomeScreen() {
  const router = useRouter();

  const ownActiveDuty = {
    data: {
      id: '1',
      started_at: new Date().toISOString(),
      ended_at: new Date().toISOString(),
      user: {
        id: '1',
        name: 'John Doe',
      },
      created_at: new Date().toISOString(),
      description: 'Patrol',
      plate_num: 'ABC-123',
      userId: '1',
      name: 'John Doe',
      type: DutyType.DESK,
    },
  };

  const activeDuties = {
    data: [
      {
        id: '1',
        started_at: new Date().toISOString(),
        ended_at: new Date().toISOString(),
        user: {
          id: '1',
          name: 'John Doe',
        },
        created_at: new Date().toISOString(),
        description: 'Patrol',
        plate_num: 'ABC-123',
        userId: '1',
        name: 'John Doe',
        type: DutyType.DESK,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {ownActiveDuty.data ? (
        <ActiveCurrentPatrol duty={ownActiveDuty.data} onEnd={() => {}} />
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
