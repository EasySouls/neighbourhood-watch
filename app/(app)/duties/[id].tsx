import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function DutyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <View>
      <Link href='/(tabs)/' style={{ color: 'blue' }}>
        <Text>DutyDetailsPage {id}</Text>
      </Link>
    </View>
  );
}
