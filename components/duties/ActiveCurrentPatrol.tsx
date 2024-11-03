import { View, Text, Paragraph, Button, Card } from 'tamagui';
import { dutyTypeToString } from '../../lib/utils';
import { Duty } from '../../types';
import { Link } from 'expo-router';
import React from 'react';

interface ActiveCurrentPatrolProps {
  duty: Duty;
  onEnd: () => void;
}

function ActiveCurrentPatrol({ duty, onEnd }: ActiveCurrentPatrolProps) {
  return (
    <Link href={`/(app)/duties/${duty.id}`} asChild>
      <Card>
        {/* Info Bar */}
        <View>
          <Text>{duty.plate_num}</Text>
          <Text>{dutyTypeToString(duty.type)}</Text>
          <Text>{new Date(duty.started_at).toLocaleTimeString()}</Text>
        </View>

        {/* Fellow officers on the duty */}
        <View>
          <Paragraph> --- A résztvevő járőrök ---</Paragraph>
        </View>
        <Button
          mt="$1"
          borderRadius="$4"
          backgroundColor="$blue10"
          onPress={onEnd}
        >
          Szolgálat befejezése
        </Button>
      </Card>
    </Link>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '60%',
//     margin: 10,
//     borderRadius: 20,
//     backgroundColor: 'lightgray',
//   },
//   infoBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     backgroundColor: 'white',
//   },
// });

export default ActiveCurrentPatrol;
