import { dutyTypeToString } from '../../lib/utils';
import { Duty } from '../../types';
import { StyleSheet, Text, View } from 'react-native';

interface ActiveCurrentPatrolProps {
  duty: Duty;
  onEnd: () => void;
}

function ActiveCurrentPatrol({ duty, onEnd }: ActiveCurrentPatrolProps) {
  return (
    <View style={styles.container}>
      {/* Info Bar */}
      <View style={styles.infoBar}>
        <Text>{duty.plate_num}</Text>
        <Text>{dutyTypeToString(duty.type)}</Text>
        <Text>{new Date(duty.started_at).toLocaleTimeString()}</Text>
      </View>

      {/* Fellow officers on the duty */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '60%',
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
});

export default ActiveCurrentPatrol;
